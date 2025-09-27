import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CardExpenseService } from './card-expense.service';
import { CreateCardExpenseDto } from './dto/create-card-expense.dto';
import { UpdateCardExpenseDto } from './dto/update-card-expense.dto';
import { User } from 'src/auth/auth.decorator';
import { UserPayload } from 'src/@types/express';
import { GetExpenseQueryDto } from './dto/get-expense-query.dto';

@Controller('card-expense')
export class CardExpenseController {
  constructor(private readonly cardExpenseService: CardExpenseService) {}

  @Post()
  create(@User() user: UserPayload, @Body() createCardExpenseDto: CreateCardExpenseDto) {
    return this.cardExpenseService.create(user.id, createCardExpenseDto);
  }

  // @Get()
  // findAll(@User() user: UserPayload, @Query() query: GetExpenseQueryDto) {
  //   return this.cardExpenseService.findAll(user.id, query);
  // }

  // @Get(':id')
  // findOne(@User() user: UserPayload, @Param('id') id: string) {
  //   return this.cardExpenseService.findOne(user.id, +id);
  // }

  // @Patch(':id')
  // update(@User() user: UserPayload, @Param('id') id: string, @Body() updateCardExpenseDto: UpdateCardExpenseDto) {
  //   return this.cardExpenseService.update(user.id, +id, updateCardExpenseDto);
  // }

  // @Delete(':id')
  // remove(@User() user: UserPayload, @Param('id') id: string) {
  //   return this.cardExpenseService.remove(user.id, +id);
  // }
}
