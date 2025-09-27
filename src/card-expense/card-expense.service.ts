import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardExpenseDto } from './dto/create-card-expense.dto';
import { UpdateCardExpenseDto } from './dto/update-card-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetExpenseQueryDto } from './dto/get-expense-query.dto';
import { CardExpense, Prisma } from '@prisma/client';

@Injectable()
export class CardExpenseService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, createCardExpenseDto: CreateCardExpenseDto,) {
    const { cardId, categoryId, date, description, value, installments } = createCardExpenseDto;
    const currentDate = new Date(date)

    const validCard = await this.prisma.card.count({ where: { userId, id: cardId } })
    const validCategory = await this.prisma.category.count({ where: { userId, id: categoryId } })

    if (!validCard) throw new HttpException("Invalid cardId", HttpStatus.BAD_REQUEST);
    if (!validCategory) throw new HttpException("Invalid categoryId", HttpStatus.BAD_REQUEST);

    const cardExpenses: Omit<CardExpense, "id">[] = []
    for (let i = 0; i < installments; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate());
      const decimalValue = new Prisma.Decimal(value);

      cardExpenses.push({
        description,
        value: decimalValue,
        date: monthDate,
        categoryId,
        cardId,
        userId,
      })
    }

    return await this.prisma.cardExpense.createMany({
      data: cardExpenses
    })
  }

  // async findAll(userId: number, query?: GetExpenseQueryDto) {
  //   const whereClause: Prisma.CardExpenseFindManyArgs = {}
  //   if(query?.date){
  //     const {date} = query;
  //     const currentDate = new Date(date);
  //     const day = currentDate.getDate();
  //     whereClause.where?.date
      
  //   }
  //   return this.prisma.cardExpense.findMany()
  // }

  // async findOne(userId: number, id: number) {
    // return await this.prisma.cardExpense.findFirst({
    //   where: {

    //   }
    // })
  // }

  // async update(userId: number, id: number, updateCardExpenseDto: UpdateCardExpenseDto) {
  //   return `This action updates a #${id} cardExpense`;
  // }

  // async remove(userId: number, id: number) {
  //   return `This action removes a #${id} cardExpense`;
  // }
}
