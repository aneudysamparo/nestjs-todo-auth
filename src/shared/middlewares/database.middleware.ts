import { Injectable, NestMiddleware, INestApplication } from '@nestjs/common';
import { Request, Response } from 'express';
import { TodoService } from '../../todo/todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared.module';
import { Configuration } from '../configuration/configuration.enum';
import { ConfigurationService } from '../configuration/configuration.service';
export let GlobalDbName = '';
export let applicationInstance: INestApplication;
@Injectable()
export class DatabaseMiddleware  {
  
  constructor(_app: INestApplication){
    applicationInstance = _app;
  }

  static interceptor = function (req: Request, res: Response, next: Function) {
    
    let mongo = applicationInstance.get(MongooseModule);
    mongo.forRootAsync({
      imports: [SharedModule],
      useFactory: async (_configService: ConfigurationService) => ({
          uri:  _configService.get(Configuration.MONGO_URI),
          retryDelay: 500,
          retryAttempts: 3,
          useNewUrlParser: true,
          useCreateIndex: true,
      }),
      inject: [ConfigurationService],
  });
    console.log('Request...');
    console.log(`Getting Request.....`);
    console.log(req.hostname);
    console.log(req.subdomains[0]);
    console.log(`Getting Headers.....`);
    console.log(req.headers);

    const dbName = req.subdomains[0];
    GlobalDbName = 'mongodb://localhost:27017/'+dbName;
    next();
  };
}
