import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';
import { TaskRepository } from '../tasks/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TaskRepository])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
