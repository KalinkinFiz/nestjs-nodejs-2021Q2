import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpExceptionFilter } from './middleware/http-exception.filter';

import { TypeormService } from './common';
import { UsersModule } from './resource/users/users.module';
import { BoardsModule } from './resource/boards/boards.module';
import { TasksModule } from './resource/tasks/tasks.module';
import { AuthModule } from './resource/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    AuthModule,
    UsersModule,
    BoardsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
