import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRespository } from './transaction.repository';
import { Prisma, Transaction } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRespository) { }
  private readonly logger = new Logger(TransactionService.name)


  async create(userId: number, createTransactionDto: CreateTransactionDto) {
    console.log(createTransactionDto.dueDate)
    try {
      const transactions: Omit<Transaction, "id">[] = [];
      for (let i = 0; i < createTransactionDto.installments; i++) {
        const newDate = new Date(createTransactionDto.dueDate);
        newDate.setMonth(newDate.getMonth() + i)

        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const formatedDate = new Date(`${year}-${month}-${day}`);

        let { accountId, categoryId, description, dueDate, type, value, wasConfirm } = createTransactionDto;

        transactions.push({
          accountId,
          categoryId,
          description,
          dueDate: formatedDate,
          wasConfirm: i > 0 ? false : wasConfirm,
          type,
          value,
          userId
        })
      }
      return await this.transactionRepository.createMany(transactions);

    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while create transaction: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(userId: number, query?: any) {
    try{
      return this.transactionRepository.findAll(userId, query)
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while get transactions: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(userId: number, id: number) {
    // return this.transactionRepository.findAll()
  }

  update(userId: number, id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.update(userId, id, updateTransactionDto)
  }

  remove(userId: number, id: number) {
    // return this.transactionRepository.findAll()
  }
}
