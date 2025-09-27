import { Injectable } from '@nestjs/common';
import { CreateCardPaymentDto } from './dto/create-card-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardPaymentService {
  constructor (private readonly prisma: PrismaService) {}

  create(userId: number, createCardPaymentDto: CreateCardPaymentDto) {
    const {value, date, cardId, accountId} = createCardPaymentDto;
    return this.prisma.cardPayment.create({
      data: {
        value, 
        date,
        cardId,
        accountId,
        userId
      }
    })
  }

  findAll() {
    return `This action returns all cardPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardPayment`;
  }

  update(id: number, updateCardPaymentDto: UpdateCardPaymentDto) {
    return `This action updates a #${id} cardPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardPayment`;
  }
}
