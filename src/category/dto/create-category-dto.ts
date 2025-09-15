import { IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class CreateCategoryDto {
  @MaxLength(30)
  @MinLength(3)
  @IsNotEmpty()
  name: string
}
