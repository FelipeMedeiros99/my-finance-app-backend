import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }
  private readonly logger = new Logger(AuthService.name);


  async createUser(createUserData: CreateUserDto) {
    const { password, confirmPassword, username } = createUserData;

    const usernameRegex = /^[a-zA-Z0-9._]+$/;

    if (username.length < 3 || username.length > 200 || !usernameRegex.test(username)) {
      throw new HttpException("Invalid username", HttpStatus.BAD_REQUEST);
    }

    if (password !== confirmPassword) {
      throw new HttpException("Passwords do not match. Please try again.", HttpStatus.BAD_REQUEST);
    }

    const userAlreadyExists = await this.userRepository.findUserByUsername(username);
    if (userAlreadyExists) {
      throw new HttpException("This username is already registered.", HttpStatus.CONFLICT);
    }

    const encryptedPassword = await bcrypt.hash(password, Number(process.env.HASH_SALTS!))
    await this.userRepository.create(username, encryptedPassword);
  }

  async signIn(username: string, password: string) {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) throw new HttpException("username not found", HttpStatus.NOT_FOUND);

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED)

    return {
      access_token: await this.jwtService.signAsync({ username: user.username, id: user.id }),
    }
  }
}