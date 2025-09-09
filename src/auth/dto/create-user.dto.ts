import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateUserDto {
  @IsEmail()
  @MaxLength(200)
  @IsNotEmpty()
  username: string
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  confirmPassword: string

}
