import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) { }
  private readonly logger = new Logger(CategoryService.name)

  async findAll(userId: number) {
      return await this.categoryRepository.findAll(userId);
  }

  async findNames(userId: number, type?: string) {
      return await this.categoryRepository.findNames(userId, type);
  }

  async find(userId: number, categoryId: number) {
      return await this.categoryRepository.findById(userId, categoryId);
  }

  async create(userId: number, data: CreateCategoryDto) {
      if(data.type !== "INCOME" && data.type !== "EXPENSE") throw new HttpException("Invalid type", HttpStatus.BAD_REQUEST);      
      
      const doesCategoryExists = await this.categoryRepository.doesExistByName(userId, data.name);
      if (doesCategoryExists) {
        throw new HttpException("Category already exists", HttpStatus.CONFLICT);
      }
      return await this.categoryRepository.create(userId, data);

  }

  async update(userId: number, categoryId: number, data: UpdateCategoryDto) {
      const doesCategoryExists = await this.categoryRepository.findById(userId, categoryId);
      if (!doesCategoryExists) {
        throw new HttpException("Category doesn't exists", HttpStatus.NOT_FOUND);
      }
      const doesNameAlreadyExists = await this.categoryRepository.doesExistByName(userId, data.name);
      if (doesNameAlreadyExists) {
        throw new HttpException("Name already exists", HttpStatus.CONFLICT);
      }

      return await this.categoryRepository.update(userId, categoryId, data);
  }

  async delete(userId: number, categoryId: number) {
      const doesCategoryExists = await this.categoryRepository.findById(userId, categoryId);
      if (!doesCategoryExists) {
        throw new HttpException("Category doesn't exists", HttpStatus.NOT_FOUND);
      }
      return await this.categoryRepository.delete(userId, categoryId);
  }

}

