import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class LoginUserDto{
  @IsEmail()
  @MaxLength(200)
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string
}