import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(readonly prisma: PrismaService) { }

  async doesExistByName(userId: number, categoryName: string) {
    return await this.prisma.account.count({
      where: {
        userId: userId,
        name: categoryName
      }
    })
  }

  async create(userId: number, data: CreateAccountDto) {
    return await this.prisma.account.create({
      data: {
        name: data.name,
        openingBalance: data?.openingBalance || 0,
        userId: userId
      }
    })
  }

  async findAll(userId: number) {
    return await this.prisma.account.findMany({
      where: {
        userId
      }
    })
  }

  async findAllWithTransaction(userId: number, query: GetAccountDto) {
    const { date } = query;

    const transactionWhere: Prisma.TransactionWhereInput = {}

    if (date) {
      const dateRequest = new Date(date);
      const endOfMonth = new Date(dateRequest.getFullYear(), dateRequest.getMonth() + 1, 0)
      transactionWhere.dueDate = {
        lte: endOfMonth
      }
    }

    return await this.prisma.account.findMany({
      where: {
        userId
      }, include: {
        transaction: {
          where: transactionWhere
        }
      }
    })
  }

  async findNames(userId: number) {
    return await this.prisma.account.findMany({
      where: {
        userId
      },
      select: {
        name: true,
        id: true
      }
    })
  }

  async findById(userId: number, accountId: number) {
    return await this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId: userId,
      }
    })
  }

  async update(userId: number, accountId: number, data: UpdateAccountDto) {
    return await this.prisma.account.update({
      where: {
        id: accountId,
        userId: userId
      },
      data: {
        name: data.name,
        openingBalance: data.openingBalance
      }
    })
  }

  async delete(userId: number, accountId: number) {
    return await this.prisma.account.delete({
      where: {
        id: accountId,
        userId: userId
      }
    })
  }
}
