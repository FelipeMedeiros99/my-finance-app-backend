import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNumber()
  openingBalance: number;
}
