import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository){}
   private readonly logger = new Logger(AccountService.name)

  async create(userId: number, createAccountDto: CreateAccountDto) {
    try{
      const accountExist = await this.accountRepository.doesExistByName(userId, createAccountDto.name);
      if(accountExist){
        throw new HttpException("Account already exists", HttpStatus.CONFLICT)
      }
      return await this.accountRepository.create(userId, createAccountDto)
    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("error while trying to create new account")
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(userId: number) {
    try{
      return await this.accountRepository.findAll(userId)
    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("error while trying to find all accounts")
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findNames(userId: number) {
    try{
      return await this.accountRepository.findNames(userId)
    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("error while trying to find all accounts")
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(userId: number, accountId: number) {
    try{
      return await this.accountRepository.findById(userId, accountId)
    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("error while trying to find an account")
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userId: number, accountId: number, updateAccountDto: UpdateAccountDto) {
    try{
      const accountExist = await this.accountRepository.findById(userId, accountId);
      if(!accountExist){
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
      }
      return await this.accountRepository.update(userId, accountId, updateAccountDto)
    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("error while trying to update an account")
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(userId, accountId: number) {
    try{
      const accountExist = await this.accountRepository.findById(userId, accountId);
      if(!accountExist){
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
      }
      return await this.accountRepository.delete(userId, accountId)
    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("error while trying to update an account")
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
