import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';
import { PhotosModule } from './photos/photos.module';
import { LoggerMiddleware } from './Middlewares/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Guards/roles.guard';
import { CatsModule } from './cats/cats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import configuration from './config/configuration';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      // envFilePath: '.development.env',
      load: [configuration],
      isGlobal: true,
    }),
    TasksModule,
    AuthModule,
    PhotosModule,
    CatsModule,
    TestsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {

  constructor(private connection: Connection,configService:ConfigService) {
    console.log(configService);
    const dbUser = configService.get<string>('DATABASE_USER');
    console.log(dbUser);
  }

  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'tasks', method: RequestMethod.GET })
  }

  private static normalizePort(val: number | string): number | string {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

    if (Number.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    throw new Error(`Port "${val}" is invalid.`);
  }
}
