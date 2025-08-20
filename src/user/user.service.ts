import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }
  private readonly logger = new Logger(UserService.name);

  async findAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (e) {
      this.logger.error(`Error searching for user: ${e}`)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (e) {
      this.logger.error(`Error searching for user: ${e}`)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createUser(createUserData: CreateUserDto) {
    const { password, confirmPassword, email } = createUserData;

    try {
      if (password !== confirmPassword) {
        throw new HttpException("Passwords do not match. Please try again.", HttpStatus.BAD_REQUEST);
      }

      const userAlreadyExists = await this.userRepository.findByEmail(email);
      if (userAlreadyExists) {
        throw new HttpException("This email is already registered.", HttpStatus.CONFLICT);
      }

      const encryptedPassword = await bcrypt.hash(password, Number(process.env.HASH_SALTS!))
      await this.userRepository.create(email, encryptedPassword);

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error(`Error creating new user: ${e}`);
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) throw new HttpException("Email not found", HttpStatus.NOT_FOUND);

      const isPasswordCorrect = await bcrypt.compare(password, user?.password);
      if(!isPasswordCorrect) throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED)

      return { email: user.email, id: user.id }

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}