import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class GetAccountDto{
  @Type(()=>Date)
  @IsOptional()
  date: Date
}