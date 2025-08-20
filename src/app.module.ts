import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FinancialModule } from './financial/financial.module';

@Module({
  imports: [
    UserModule,
    FinancialModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    }), 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
