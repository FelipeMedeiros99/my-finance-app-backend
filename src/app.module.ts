import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CategoryModule, 
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    }), AccountModule, TransactionModule, CardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
