import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { usersRepository } from '../repositories/UsersRepository';

interface IAuthenticateUserService {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserService) {
    const user = await usersRepository.findOneBy({ email });
    if (!user) throw new Error('Email/Password incorrect');

    const passwordIsCorrect = await compare(password, user.password);
    if (!passwordIsCorrect) new Error('Email/Password incorrect.');

    const token = sign({email: user.email}, 'secret', {
        subject: user.id,
        expiresIn: '1d',
    })

    return {token};
  }
}
