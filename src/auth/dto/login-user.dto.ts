import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class LoginUserDto{
  @MaxLength(200)
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string
}