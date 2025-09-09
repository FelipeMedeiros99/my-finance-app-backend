import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "../user/user.repository";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserRepository],
  exports: [AuthService]
})
export class AuthModule {};