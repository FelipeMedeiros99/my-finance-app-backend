import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @Type(()=>Date)
  @IsNotEmpty()
  @IsDate()
  closeDate: Date;
}
