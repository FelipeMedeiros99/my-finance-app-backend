import { PartialType } from '@nestjs/mapped-types';
import { CreateCardExpenseDto } from './create-card-expense.dto';

export class UpdateCardExpenseDto extends PartialType(CreateCardExpenseDto) {}
