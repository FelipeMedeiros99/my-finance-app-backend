import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

  create(userId: number, createCardDto: CreateCardDto) {
  }

  findAll(userId: number, ) {
    return `This action returns all card`;
  }

  findOne(userId: number, id: number) {
    return `This action returns a #${id} card`;
  }

  update(userId: number, id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(userId: number, id: number) {
    return `This action removes a #${id} card`;
  }
}
