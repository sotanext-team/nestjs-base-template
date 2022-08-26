import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CatsModule } from './modules/cats/cats.module';
import configuration from '@/configs/configuration';
import { AppLoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('DB_URI'),
          dbName: configService.get<string>('DB_NAME'),
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Enable logger for all request on production
    // if (isProdEnv() || isSandboxEnv()) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
    // }
  }
}
