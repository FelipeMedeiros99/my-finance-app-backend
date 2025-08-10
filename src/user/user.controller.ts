import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";

@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService){}

  @Get("all")
  async getAll(){
    if(process.env.ENV==="DEV"){
      return await this.userService.findAllUsers()
    }else{
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }

  @Post("new")
  @HttpCode(201)
  async create(@Body() createUserData: CreateUserDto){
    return await this.userService.createUser(createUserData);
  }

}