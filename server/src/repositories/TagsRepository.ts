import { Tag } from '../entities/Tag';
import { dataSource } from './../dataSource';

export const tagsRepository = dataSource.getRepository(Tag);
