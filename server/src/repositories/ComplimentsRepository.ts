import { dataSource } from '../dataSource';
import { Compliment } from '../entities/Compliment';

export const complimentsRepository = dataSource.getRepository(Compliment);
