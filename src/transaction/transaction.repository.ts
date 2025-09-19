import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionRespository {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(userId:number, createTransactionDto: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: {
        description: createTransactionDto.description,
        value: createTransactionDto.value, 
        dueDate: createTransactionDto.dueDate,
        type: createTransactionDto.type,
        wasConfirm: createTransactionDto.wasConfirm,
        userId: userId,
        categoryId: createTransactionDto.categoryId,
        accountId: createTransactionDto.accountId,

      }
    });
  }

  findAll(userId:number) {
    return `This action returns all transaction`;
  }

  findOne(userId:number, id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(userId:number, id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(userId:number, id: number) {
    return `This action removes a #${id} transaction`;
  }
}
