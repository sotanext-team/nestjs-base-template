import configuration from '@/configs/configuration';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  isDevEnv,
  isLocalEnv,
  isProdEnv,
  isSandboxEnv,
  isStagingEnv,
} from './configs/env.config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { normalizeValidationError } from './common/utilities/exception.utility';
import { TransformInterceptor } from './common/interceptors/response';
import { useContainer } from 'class-validator';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';

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

  // Global Validation Custom
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors.length > 0)
          throw new BadRequestException(normalizeValidationError(errors));
      },
    }),
  );
  // Response Transformer Mapping
  app.useGlobalInterceptors(new TransformInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Use global filter
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT;
  // const port = this.configService.get<string>('PORT');

  await app.listen(port, function () {
    console.log(`start localhost:${port}`);
  });
}
bootstrap();
