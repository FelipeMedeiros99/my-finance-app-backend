import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto } from "./user.dto";
import * as bcrypt from "bcrypt";
import { UserGuard } from "./user.guard";

@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService){ }

  // @UseGuards(UserGuard)
  // @Get("all")
  // async getAll(){
  //   if(process.env.ENV==="DEV"){
  //     return await this.userService.findAllUsers()
  //   }else{
  //     throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  //   }
  // }

  @Post("register")
  @HttpCode(201)
  async create(@Body() createUserData: CreateUserDto){
    return await this.userService.createUser(createUserData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.userService.signIn(signInDto.email, signInDto.password);
  }

  
}