import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateCardExpenseDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  description: string;
  
  @IsNotEmpty()
  @IsNumber()
  value: number;
  
  @Type(()=>Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;
  
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
  
  @IsNotEmpty()
  @IsNumber()
  cardId: number; 

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  installments: number
}
