import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req: any) {
    const userData = req.user;
    return this.transactionService.create(userData.id, createTransactionDto);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    console.log(query)
    const {date, type} = query;
    console.log({date, type})
    const userData = req.user;
    return this.transactionService.findAll(userData.id, date, type);
  }

  // @Get(':id')
  // findOne(@Request() req: any, @Param('id') id: string) {
  //   const userData = req.user;
  //   return this.transactionService.findOne(+id);
  // }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    const userData = req.user;
    return this.transactionService.update(userData.id, +id, updateTransactionDto);
  }

  // @Delete(':id')
  // remove(@Request() req: any, @Param('id') id: string) {
  //   const userData = req.user;
  //   return this.transactionService.remove(+id);
  // }
}
