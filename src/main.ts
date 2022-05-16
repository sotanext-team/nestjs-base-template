// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'reflect-metadata';

const errorStackTracerFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.splat(), // Necessary to produce the 'meta' property
        errorStackTracerFormat(),
        winston.format.simple(),
      ),
      // options
      transports: [
        new winston.transports.File({
          filename: 'application-error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'application-debug.log',
          level: 'debug',
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  });
  await app.startAllMicroservices();

  await app.listen(+process.env.PORT, function () {
    console.log(`start localhost:${process.env.PORT}`);
  });
}
bootstrap();
