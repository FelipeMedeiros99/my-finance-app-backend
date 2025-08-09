import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService{
  constructor(private prisma: PrismaService) {}
}