import { hash } from 'bcryptjs';
import { usersRepository } from '../repositories/UsersRepository';

interface ICreateUserService {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, admin = false, password }: ICreateUserService) {
    if (!email) throw new Error('Email incorrect.');

    const userAlreadyExists = await usersRepository.findOneBy({ email });
    if (userAlreadyExists) throw new Error('User already exists.');

    const passHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passHash,
    });

    await usersRepository.save(user);
    return user;
  }
}
