import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
