import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardPaymentService } from './card-payment.service';
import { CreateCardPaymentDto } from './dto/create-card-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';
import { User } from 'src/auth/auth.decorator';
import { UserPayload } from 'src/@types/express';

@Controller('card-payment')
export class CardPaymentController {
  constructor(private readonly cardPaymentService: CardPaymentService) {}

  @Post()
  create(@User() user: UserPayload, @Body() createCardPaymentDto: CreateCardPaymentDto) {
    return this.cardPaymentService.create(user.id, createCardPaymentDto);
  }

  // @Get()
  // findAll() {
  //   return this.cardPaymentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cardPaymentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCardPaymentDto: UpdateCardPaymentDto) {
  //   return this.cardPaymentService.update(+id, updateCardPaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cardPaymentService.remove(+id);
  // }
}
