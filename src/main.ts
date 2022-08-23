import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'reflect-metadata';
import {
  isDevEnv,
  isLocalEnv,
  isProdEnv,
  isSandboxEnv,
  isStagingEnv,
} from './configs/env.config';

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
  const hideColor = isProdEnv() || isSandboxEnv();
  const uncolorizeOpts = {
    level: hideColor,
    message: hideColor,
    raw: hideColor,
  };

  const logLevelDebug = isLocalEnv() || isDevEnv() || isStagingEnv();
  // Step Logger
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
          level: logLevelDebug ? 'debug' : 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
            winston.format.uncolorize(uncolorizeOpts),
          ),
        }),
      ],
    }),
  });
  // await app.startAllMicroservices();

  await app.listen(+process.env.PORT, function () {
    console.log(`start localhost:${process.env.PORT}`);
  });
}
bootstrap();
