import { Decimal } from "@prisma/client/runtime/library";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateTransactionDto{
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  @Max(100)
  installments: number

  @Type(()=>Object)
  @IsNumber()
  @IsNotEmpty()
  value: Decimal;

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
