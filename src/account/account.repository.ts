import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountRepository {
  constructor (readonly prisma: PrismaService){}
  
  // async create(userId: number, data: CreateAccountDto) {
  //   return await this.prisma.category.create({
  //     data: {
  //       name: data.name,
  //       type: data.type,
  //       userId: userId
  //     }
  //   })
  // }

  // async findAll(userId: number) {
  //   return await this.prisma.category.findMany({
  //     where: {
  //       userId: userId
  //     }
  //   })
  // }

  // async findByName(userId: number, categoryName: string) {
  //   return await this.prisma.category.findFirst({
  //     where: {
  //       userId: userId,
  //       name: categoryName
  //     }
  //   })
  // }

  // async findById(userId: number, categoryId: number) {
  //   return await this.prisma.category.findFirst({
  //     where: {
  //       id: categoryId,
  //       userId: userId,
  //     }
  //   })
  // }

  // async update(userId: number, categoryId: number, data: UpdateAccountDto) {
  //   return await this.prisma.category.update({ 
  //     where: {
  //       id: categoryId,
  //       userId: userId
  //     },
  //     data:{
  //       name: data.name
  //     }
  //   })
  // }

  // async delete(userId: number, categoryId: number) {
  //   return await this.prisma.category.delete({
  //     where: {
  //       id: categoryId,
  //       userId: userId
  //     }
  //   })
  // }
}
