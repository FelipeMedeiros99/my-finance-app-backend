import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { User } from 'src/auth/auth.decorator';
import { UserPayload } from 'src/@types/express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @User() user: UserPayload) {
    return this.transactionService.create(user.id, createTransactionDto);
  }

  @Get()
  findAll(@User() user: any, @Query() query?: UserPayload) {
    return this.transactionService.findAll(user.id, query);
  }

  // @Get(':id')
  // findOne(@User() user: UserPayload, @Param('id') id: string) {
  //   return this.transactionService.findOne(+id);
  // }

  @Put(':id')
  update(@User() user: UserPayload, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(user.id, +id, updateTransactionDto);
  }

  // @Delete(':id')
  // remove(@User() user: UserPayload, @Param('id') id: string) {
  //   return this.transactionService.remove(+id);
  // }
}
