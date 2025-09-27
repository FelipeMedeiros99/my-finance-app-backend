import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { CardModule } from './card/card.module';
import { CatchEverythingFilter } from './common/http-exception.filter';
import { AuthGuard } from './auth/auth.guard';
import { CardExpenseModule } from './card-expense/card-expense.module';
import { CardPaymentModule } from './card-payment/card-payment.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CategoryModule, 
    AccountModule, 
    TransactionModule, 
    CardModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    }),
    CardExpenseModule,
    CardPaymentModule, 
  ],
  controllers: [],
  providers: [
    {
      provide: "APP_FILTER", 
      useClass: CatchEverythingFilter,
    },
    {
      provide: "APP_GUARD", 
      useClass: AuthGuard,
    },

  ],
})
export class AppModule {}
