import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Injectable()
export class CategoryRepository {
  constructor (readonly prisma: PrismaService){}
  
  async findAll(userId: number) {
    return await this.prisma.category.findMany({
      where: {
        userId: userId
      }
    })
  }

  async findByName(userId: number, categoryName: string) {
    return await this.prisma.category.findFirst({
      where: {
        userId: userId,
        name: categoryName
      }
    })
  }

  async findById(userId: number, categoryId: number) {
    return await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: userId,
      }
    })
  }

  async create(userId: number, data: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: data.name,
        type: data.type,
        userId: userId
      }
    })
  }

  async update(userId: number, categoryId: number, data: UpdateCategoryDto) {
    return await this.prisma.category.update({ 
      where: {
        id: categoryId,
        userId: userId
      },
      data:{
        name: data.name
      }
    })
  }

  async delete(userId: number, categoryId: number) {
    return await this.prisma.category.delete({
      where: {
        id: categoryId,
        userId: userId
      }
    })
  }
}
