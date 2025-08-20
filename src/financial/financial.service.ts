import { Injectable } from '@nestjs/common';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinancialService {
  constructor (private readonly prisma: PrismaService) {}
  create(createFinancialDto: CreateFinancialDto) {
    return 'This action adds a new financial';
  }

  findAll() {
    return `This action returns all financial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financial`;
  }

  update(id: number, updateFinancialDto: UpdateFinancialDto) {
    return `This action updates a #${id} financial`;
  }

  remove(id: number) {
    return `This action removes a #${id} financial`;
  }
}
