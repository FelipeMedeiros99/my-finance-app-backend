import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AccountModule } from './account/account.module';
import { GetUserDataMiddleware } from './app.middleware';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CategoryModule, 
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    }), AccountModule, TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserDataMiddleware)
      .forRoutes("category", "account", "transaction")
  }
}
