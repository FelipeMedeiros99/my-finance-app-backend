import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { Public } from "src/common/public.decorator";

@Public()
@Controller()
export class AuthController{
  constructor(private readonly authService: AuthService){ }

  @Post("register")
  @HttpCode(201)
  async create(@Body() createUserData: CreateUserDto){
    return await this.authService.createUser(createUserData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  
}