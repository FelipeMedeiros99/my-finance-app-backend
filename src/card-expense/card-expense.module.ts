import { Module } from '@nestjs/common';
import { CardExpenseService } from './card-expense.service';
import { CardExpenseController } from './card-expense.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CardExpenseController],
  providers: [CardExpenseService, PrismaService],
})
export class CardExpenseModule {}
