import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Transaction } from '@prisma/client';

@Injectable()
export class TransactionRespository {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, createTransactionDto: CreateTransactionDto) {
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

  async createMany(createTransaction: Omit<Transaction, "id">[]) {
    return await this.prisma.transaction.createMany({
      data: createTransaction
    });
  }

  findAll(userId: number, query?: any) {
    const whereClause: Prisma.TransactionWhereInput = { userId };
    const queryKeys = Object.keys(query)

    for (let key of queryKeys) {
      if (key === "date") {
        const date = new Date(query[key]);
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)
        whereClause.dueDate = {
          gte: startDate,
          lt: endDate
        }
      } else if (!isNaN(Number(query[key]))) {
        whereClause[key] = Number(query[key])
      } else {
        whereClause[key] = query[key]
      }
    }

    return this.prisma.transaction.findMany({
      where: whereClause,
      include: {
        category: true,
        account: true
      },
      orderBy: {
        description: "asc"
      }
    });
  }

  findOne(userId: number, id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(userId: number, id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: {
        userId,
        id
      },
      data: {
        wasConfirm: updateTransactionDto.wasConfirm,
        accountId: updateTransactionDto.accountId,
        categoryId: updateTransactionDto.categoryId,
        description: updateTransactionDto.description,
        value: updateTransactionDto.value,
        dueDate: updateTransactionDto.dueDate,
        type: updateTransactionDto.type
      }
    })
  }

  remove(userId: number, id: number) {
    return `This action removes a #${id} transaction`;
  }
}
