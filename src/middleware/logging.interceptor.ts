import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept = (context: ExecutionContext, next: CallHandler): Observable<any> => {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const requestTime = new Date();
    const processTime = Date.now() - +requestTime;
    const logsFolder = path.join(__dirname, '../../logs');

    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }

    const recLogging = (text: string) => {
      fs.appendFileSync('./logs/logging.log', `${text}\n`);
    };

    recLogging(
      ` ⛩   REQUEST: ${req.method} 
      URL: ${req.url}, 
      QUERY: ${req.query}, 
      BODY: ${req.body} 
      PROCESSING TIME: ${processTime} 
      STATUS CODE: ${res.statusCode}\n`,
    );

    return next.handle().pipe(
      tap(() => {
        Logger.debug(
          `⛩  REQUEST: ${req.method} URL: ${req.url}, QUERY: ${req.query}, BODY: ${req.body} PROCESSING TIME: ${processTime} STATUS CODE: ${res.statusCode}`,
          'Restful',
        );
      }),
    );
  };
}
