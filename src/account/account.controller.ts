import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UsePipes, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetAccountDto } from './dto/get-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto, @Request() req: any) {
    const userData = req.user;
    return this.accountService.create(userData.id, createAccountDto);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: GetAccountDto) {
    const userData = req.user;
    return this.accountService.findAll(userData.id, query);
  }

  @Get("names")
  findNames(@Request() req: any) {
    const userData = req.user;
    return this.accountService.findNames(userData.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const userData = req.user;
    return this.accountService.findOne(userData.id, id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccountDto: UpdateAccountDto, @Request() req: any) {
    const userData = req.user;
    return this.accountService.update(userData.id, id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const userData = req.user;
    return this.accountService.remove(userData.id, id);
  }
}
