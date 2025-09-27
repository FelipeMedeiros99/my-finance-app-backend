import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class GetExpenseQueryDto{
  @Type(()=>Date)
  @IsOptional()
  @IsDate()
  date?: Date;
}