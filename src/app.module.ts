import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { FinancialModule } from './financial/financial.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
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
