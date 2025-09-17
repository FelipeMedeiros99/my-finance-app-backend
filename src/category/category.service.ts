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
    try {
      return await this.categoryRepository.findAll(userId);
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(userId: number, categoryId: number) {
    try {
      return await this.categoryRepository.findById(userId, categoryId);
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(userId: number, data: CreateCategoryDto) {
    try {
      if(data.type !== "INCOME" && data.type !== "EXPENSE") throw new HttpException("Invalid type", HttpStatus.BAD_REQUEST);      
      
      const doesCategoryExists = await this.categoryRepository.doesExistByName(userId, data.name);
      if (doesCategoryExists) {
        throw new HttpException("Category already exists", HttpStatus.CONFLICT);
      }
      return await this.categoryRepository.create(userId, data);
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userId: number, categoryId: number, data: UpdateCategoryDto) {
    try {
      const doesCategoryExists = await this.categoryRepository.findById(userId, categoryId);
      if (!doesCategoryExists) {
        throw new HttpException("Category doesn't exists", HttpStatus.NOT_FOUND);
      }
      const doesNameAlreadyExists = await this.categoryRepository.doesExistByName(userId, data.name);
      if (doesNameAlreadyExists) {
        throw new HttpException("Name already exists", HttpStatus.CONFLICT);
      }

      return await this.categoryRepository.update(userId, categoryId, data);
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(userId: number, categoryId: number) {
    try {
      const doesCategoryExists = await this.categoryRepository.findById(userId, categoryId);
      if (!doesCategoryExists) {
        throw new HttpException("Category doesn't exists", HttpStatus.NOT_FOUND);
      }
      return await this.categoryRepository.delete(userId, categoryId);
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

