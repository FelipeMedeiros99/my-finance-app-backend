import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from 'src/auth/auth.decorator';
import { UserPayload } from 'src/@types/express';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@User() user: UserPayload, @Body() createCardDto: CreateCardDto) {
    return this.cardService.create(user.id, createCardDto);
  }

  @Get()
  async findAll(@User() user: UserPayload) {
    return await this.cardService.findAll(user.id);
  }

  @Get(':id')
  findOne(@User() user: UserPayload, @Param('id') id: string) {
    return this.cardService.findOne(user.id, +id);
  }

  @Patch(':id')
  update(@User() user: UserPayload, @Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(user.id, +id, updateCardDto);
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    return this.cardService.remove(user.id, +id);
  }
}
