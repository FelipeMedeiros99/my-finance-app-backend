import { Injectable } from '@nestjs/common';
import { CreateCardPaymentDto } from './dto/create-card-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class CardPaymentService {
  constructor (private readonly prisma: PrismaClient) {}

  create(userId: number, createCardPaymentDto: CreateCardPaymentDto) {
    return this.prisma.cardPayment.create({
      where: {
        userId
      },
      data: createCardPaymentDto
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
