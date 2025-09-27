import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateCardPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(3)
  value: number;

  @Type(()=>Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  cardId: number;
}
