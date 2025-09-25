import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './account.repository';
import { GetAccountDto } from './dto/get-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) { }
  private readonly logger = new Logger(AccountService.name)

  async create(userId: number, createAccountDto: CreateAccountDto) {
    const accountExist = await this.accountRepository.doesExistByName(userId, createAccountDto.name);
    if (accountExist) {
      throw new HttpException("Account already exists", HttpStatus.CONFLICT)
    }
    return await this.accountRepository.create(userId, createAccountDto)

  }

  async findAll(userId: number, query?: GetAccountDto) {
    if (query) {
      return await this.accountRepository.findAllWithTransaction(userId, query)
    } else {
      return await this.accountRepository.findAll(userId)
    }
  }

  async findNames(userId: number) {
    return await this.accountRepository.findNames(userId)

  }

  async findOne(userId: number, accountId: number) {
    return await this.accountRepository.findById(userId, accountId)

  }

  async update(userId: number, accountId: number, updateAccountDto: UpdateAccountDto) {
    const accountExist = await this.accountRepository.findById(userId, accountId);
    if (!accountExist) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }
    return await this.accountRepository.update(userId, accountId, updateAccountDto)

  }

  async remove(userId: number, accountId: number) {
    const accountExist = await this.accountRepository.findById(userId, accountId);
    if (!accountExist) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }
    return await this.accountRepository.delete(userId, accountId)

  }
}
