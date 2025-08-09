import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserRepository {
  constructor (private readonly prisma: PrismaService){}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createNewUser(userData: CreateUserDto){
    await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password
      }
    })
  }


}