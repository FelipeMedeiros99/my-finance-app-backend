
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  private readonly logger = new Logger(CatchEverythingFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    let httpStatus: number;
    let message: any;

    if(exception instanceof HttpException){
      httpStatus = exception.getStatus();
      const response = exception?.getResponse() as any;
      if(response.message){
        message = response.message;
      }else{
        message = response;
      }
    }else{
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    if(httpStatus === HttpStatus.INTERNAL_SERVER_ERROR){
      this.logger.error(exception)
    }

    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
