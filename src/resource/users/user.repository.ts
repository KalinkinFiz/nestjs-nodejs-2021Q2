import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.entity';

@EntityRepository(UserModel)
export class UserRepository extends AbstractRepository<UserModel> {
  createUser({ name, login, password }: CreateUserDto) {
    const user = this.repository.create({ name, login, password });
    return this.repository.save(user);
  }

  getAllUsers() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  findByCredentials(login: string) {
    return this.repository.findOne({ login });
  }

  updateById(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update({ id }, updateUserDto);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}
