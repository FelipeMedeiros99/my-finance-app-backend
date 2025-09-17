import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';


type UserDataToken = {
  username: string,
  id: number
}

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get()
  findAll(@Request() req: any) {
    const userData = req.user;
    return this.categoryService.findAll(userData.id);
  }

  @Get(":id")
  find(@Param("id", ParseIntPipe) id: number, @Request() req: any) {
    const userData = req.user;
    return this.categoryService.find(userData.id, id);
  }

  @Post()
  create(@Body() body: CreateCategoryDto, @Request() req: any) {
    const userData = req.user;

    return this.categoryService.create(userData.id, body);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateCategoryDto, @Request() req: any) {
    const userData = req.user;

    return this.categoryService.update(userData.id, id, body);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number, @Request() req: any){
    
    const userData = req.user;
    return this.categoryService.delete(userData.id, id);
  }
}
