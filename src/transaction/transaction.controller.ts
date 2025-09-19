import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req: any) {
    const userData = req.user;
    console.log(createTransactionDto)
    return this.transactionService.create(userData.id, createTransactionDto);
  }

  // @Get()
  // findAll(@Request() req: any, ) {
  //   const userData = req.user;
  //   return this.transactionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Request() req: any, @Param('id') id: string) {
  //   const userData = req.user;
  //   return this.transactionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Request() req: any, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   const userData = req.user;
  //   return this.transactionService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Request() req: any, @Param('id') id: string) {
  //   const userData = req.user;
  //   return this.transactionService.remove(+id);
  // }
}
