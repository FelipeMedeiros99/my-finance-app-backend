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
      const transactions: Omit<Transaction, "id">[] = [];
      const { accountId, categoryId, description, dueDate, type, value, wasConfirm, installments } = createTransactionDto;


      const baseDate = new Date(dueDate); // Make a copy of the original Date object

      console.log({baseDate, dueDate})

      for (let i = 0; i < installments; i++) {

        const installmentDate = new Date(baseDate);
        installmentDate.setMonth(baseDate.getMonth() + i);
      
        // console.log({
        //   instalment: installmentDate, 
        //   installmentDate: installmentDate.getDate(),
        //   installmentMonth: installmentDate.getMonth(),
        //   installYear: installmentDate.getFullYear(),
        //   baseDate: baseDate, 
        //   baseDateDate: baseDate.getDate(), 
        //   baseDateMonth: baseDate.getMonth() + i,
        //   baseDateYear: baseDate.getFullYear(),
        //   validation: installmentDate.getDate() !== baseDate.getDate()})

        if (installmentDate.getDate() !== baseDate.getDate()) {
            installmentDate.setDate(0); 
        }
        const isConfirmed = i === 0 ? wasConfirm : false;

        transactions.push({
          accountId,
          categoryId,
          description,
          dueDate: installmentDate,
          wasConfirm: isConfirmed,
          type,
          value,
          userId,
        });
      }
      
      // console.log(transactions)

      return await this.transactionRepository.createMany(transactions);    
    // let { accountId, categoryId, description, dueDate, type, value, wasConfirm } = createTransactionDto;
    
    // try {
    //   const transactions: Omit<Transaction, "id">[] = [];
    //   const baseDate = new Date(dueDate);

    //   for (let i = 0; i < createTransactionDto.installments; i++) {

    //     const installmentDate = new Date(baseDate);
    //     installmentDate.setMonth(baseDate.getMonth() + i);

    //     console.log({instalmentdata: installmentDate.getMonth(), baseDate: ((baseDate.getMonth() + i) % 11)})



    //     if(installmentDate.getMonth() !== ((baseDate.getMonth() + i) % 11)){
    //       installmentDate.setDate(0);
    //     }

    //     transactions.push({
    //       accountId,
    //       categoryId,
    //       description,
    //       dueDate: installmentDate,
    //       wasConfirm: i > 0 ? false : wasConfirm,
    //       type,
    //       value,
    //       userId
    //     })
    //   }
    //   // console.log(transactions)
    //   return await this.transactionRepository.createMany(transactions);

    // } catch (e) {
    //   if (e instanceof HttpException) throw e;
    //   this.logger.error("Error while create transaction: ", e)
    //   throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  findAll(userId: number, query?: any) {
    return this.transactionRepository.findAll(userId, query)

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
