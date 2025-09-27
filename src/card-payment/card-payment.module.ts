import { Module } from '@nestjs/common';
import { CardPaymentService } from './card-payment.service';
import { CardPaymentController } from './card-payment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CardPaymentController],
  providers: [CardPaymentService, PrismaService],
})
export class CardPaymentModule {}
