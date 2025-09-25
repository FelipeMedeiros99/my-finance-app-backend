import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) { }
  private readonly logger = new Logger(CardService.name);

  async count(userId: number, field: string, fieldValue: number | string) {
    const fieldValues = ['id', 'name', 'dueDay', 'closeDay']

    if(fieldValues.indexOf(field) === -1){
      throw new HttpException(`Invalid field ${field}`, HttpStatus.BAD_REQUEST);
    }
    const where: Prisma.CardWhereInput = {userId};
    where[field] = fieldValue;

    return await this.prisma.card.count({ where })
  }

  async create(userId: number, createCardDto: CreateCardDto) {
    const { name, limit, closeDay, dueDay } = createCardDto;

    const nameAlreadyExists = await this.count(userId, "name", name)

    if (nameAlreadyExists) {
      throw new HttpException("Card name already exist", HttpStatus.CONFLICT)
    }

    return await this.prisma.card.create({
      data: {
        name,
        limit,
        closeDay,
        dueDay,
        userId
      }
    })
  }

  async findAll(userId: number) {
    return this.prisma.card.findMany({
      where: {
        userId
      }
    });
  }

  async findOne(userId: number, id: number) {
    return await this.prisma.card.findUnique({ where: { userId, id } })
  }

  async update(userId: number, id: number, updateCardDto: UpdateCardDto) {
    const cardExists = await this.count(userId, "id", id )
    if (!cardExists) {
      throw new HttpException("Card doesn't exist", HttpStatus.NOT_FOUND)
    }

    return this.prisma.card.update({
      where: { userId, id },
      data: updateCardDto
    })
  }

  async remove(userId: number, id: number) {
    const cardExists = await this.count(userId, "id", id)
    if(!cardExists){
      throw new HttpException("Card doesn't exist", HttpStatus.NOT_FOUND)
    }
    return await this.prisma.card.delete({
      where: { userId, id }
    })
  }
}
