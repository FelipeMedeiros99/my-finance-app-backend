import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateCategoryDto {
  @MaxLength(30)
  @MinLength(3)
  @IsNotEmpty()
  name: string
}
