import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateCategoryDto } from './dto/create-category-dto';


type UserDataToken = {
  username: string,
  id: number
}

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly jwtService: JwtService
  ) {}

  @Get("all")
  findAll(@Headers() header: any) {
    const token = header.authorization.split(" ")[1];
    const userData = this.jwtService.decode(token) as UserDataToken;
    return this.categoryService.findAll(userData.id);
  }

  @Get(":id")
  find(@Param("id", ParseIntPipe) id: number, @Headers() header: any) {
    const token = header.authorization.split(" ")[1];
    const userData = this.jwtService.decode(token) as UserDataToken;
    return this.categoryService.find(userData.id, id);
  }

  @Post("new")
  create(@Body() body: CreateCategoryDto, @Headers() header: any) {
    const token = header.authorization.split(" ")[1];
    const userData = this.jwtService.decode(token) as UserDataToken;

    return this.categoryService.create(userData.id, body);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() body: CreateCategoryDto, @Headers() header: any) {
    const token = header.authorization.split(" ")[1];
    const userData = this.jwtService.decode(token) as UserDataToken;

    return this.categoryService.update(userData.id, id, body);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number, @Headers() header: any){
    
    const token = header.authorization.split(" ")[1];
    const userData = this.jwtService.decode(token) as UserDataToken;
    return this.categoryService.delete(userData.id, id);
  }
}
