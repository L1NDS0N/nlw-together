import { dataSource } from '../dataSource';
import { User } from '../entities/User';

export const usersRepository = dataSource.getRepository(User);


