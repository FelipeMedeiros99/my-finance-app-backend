import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
// "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(username: string, password: string) {
    return await this.prisma.user.create({
      data: {
        username: username,
        password: password
      }
    })
  }

  async findUserByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username }
    })
  }
}