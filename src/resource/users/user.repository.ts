import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async createUser(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getById(id: string) {
    return await this.usersRepository.findOne({ id });
  }

  async findByCredentials(login: string) {
    return await this.usersRepository.findOne({ login });
  }

  async updateById(id: string, user: UpdateUserDto) {
    return await this.usersRepository.update({ id }, user);
  }

  async deleteById(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
