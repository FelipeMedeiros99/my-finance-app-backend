import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRespository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRespository) { }
  private readonly logger = new Logger(TransactionService.name)

  async create(userId: number, createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionRepository.create(userId, createTransactionDto);
    } catch (e) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(userId: number) {
    // return this.transactionRepository.findAll()
  }

  findOne(userId: number, id: number) {
    // return this.transactionRepository.findAll()
  }

  update(userId: number, id: number, updateTransactionDto: UpdateTransactionDto) {
    // return this.transactionRepository.findAll()
  }

  remove(userId: number, id: number) {
    // return this.transactionRepository.findAll()
  }
}
