import { Module } from '@nestjs/common';
import { CardPaymentService } from './card-payment.service';
import { CardPaymentController } from './card-payment.controller';

@Module({
  controllers: [CardPaymentController],
  providers: [CardPaymentService],
})
export class CardPaymentModule {}
