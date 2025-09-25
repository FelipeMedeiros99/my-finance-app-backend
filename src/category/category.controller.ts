import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { User } from 'src/auth/auth.decorator';
import { UserPayload } from 'src/@types/express';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get()
  findAll(@User() user: UserPayload) {
    console.log(user)
    return this.categoryService.findAll(user.id);
  }

  @Get("names")
  findNames(@User() user: UserPayload, @Query("type") type: string) {
    return this.categoryService.findNames(user.id, type);
  }

  @Get(":id")
  find(@Param("id", ParseIntPipe) id: number, @User() user: UserPayload) {
    return this.categoryService.find(user.id, id);
  }

  @Post()
  create(@Body() body: CreateCategoryDto, @User() user: UserPayload) {

    return this.categoryService.create(user.id, body);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateCategoryDto, @User() user: UserPayload) {

    return this.categoryService.update(user.id, id, body);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number, @User() user: UserPayload){
    
    return this.categoryService.delete(user.id, id);
  }
}
