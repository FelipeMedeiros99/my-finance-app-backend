import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRespository } from './transaction.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRespository, PrismaService],
})
export class TransactionModule {}
