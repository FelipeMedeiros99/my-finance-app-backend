import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { User } from 'src/auth/auth.decorator';
import { UserPayload } from 'src/@types/express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto, @User() user: UserPayload) {
    return this.accountService.create(user.id, createAccountDto);
  }

  @Get()
  findAll(@User() user: UserPayload, @Query() query: GetAccountDto) {
    return this.accountService.findAll(user.id, query);
  }

  @Get("names")
  findNames(@User() user: UserPayload) {
    return this.accountService.findNames(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User() user: UserPayload) {
    return this.accountService.findOne(user.id, id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccountDto: UpdateAccountDto, @User() user: UserPayload) {
    return this.accountService.update(user.id, id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserPayload) {
    return this.accountService.remove(user.id, id);
  }
}
