import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "./user.repository";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserService]
})
export class UserModule {};