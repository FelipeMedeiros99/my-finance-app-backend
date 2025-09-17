
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

type UserDataToken = {
  username: string,
  id: number
}

@Injectable()
export class GetUserDataMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService){}

  use(req: Request, res: Response, next: NextFunction) {
    const {headers} = req;
    if(headers.authorization){
      const token = headers.authorization.split(" ")[1];
      const userData = this.jwtService.decode(token) as UserDataToken;
      req.user = userData;
    }
    next();
  }
}
