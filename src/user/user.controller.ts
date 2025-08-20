import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService){ }

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