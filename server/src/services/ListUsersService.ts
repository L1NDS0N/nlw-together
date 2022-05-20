import { classToPlain } from 'class-transformer';
import { usersRepository } from './../repositories/UsersRepository';
export class ListUsersService {
  async execute() {
    const users = await usersRepository.find();
    return classToPlain(users);
  }
}
