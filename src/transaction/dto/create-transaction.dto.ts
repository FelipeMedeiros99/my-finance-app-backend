import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class CreateTransactionDto{
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/)
  dueDate: string;

  @IsNotEmpty()
  @IsIn(["INCOME", "EXPENSE"])
  type: "INCOME" | "EXPENSE";

  @IsBoolean()
  @IsNotEmpty()
  wasConfirm: boolean;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;
}
