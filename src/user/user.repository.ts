import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        id: true,
      }
    });
  }

  async create(email: string, password: string) {
    return await this.prisma.user.create({
      data: {
        email: email,
        password: password
      }
    })
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email: email }
    })
  }
}