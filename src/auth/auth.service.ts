import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private userService: UserService){}
  private logger = new Logger()


  async signIn(email: string, password: string){
    try{
      const user = await this.userService.findUserByEmail(email);
      if(!user) throw new HttpException("Email not found", HttpStatus.NOT_FOUND);
      await bcrypt.compare(password, user?.password);

      return {email: user.email, id: user.id}

    }catch(e){
      if(e instanceof HttpException) throw e;
      this.logger.error("Error while test user: ", e)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
