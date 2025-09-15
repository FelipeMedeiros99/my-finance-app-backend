import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CategoryModule, 
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
