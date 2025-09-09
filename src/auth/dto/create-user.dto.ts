import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateUserDto {
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
