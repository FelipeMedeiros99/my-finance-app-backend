import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(31)
  @Min(1)
  closeDay: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(31)
  @Min(1)
  dueDay: number;
}
