import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    console.log(`Getting Request.....`);
    console.log(req);
    console.log(`Getting Headers.....`);
    console.log(req.header);
    next();
  }
}