import { tagsRepository } from '../repositories/TagsRepository';
import { classToPlain } from 'class-transformer';

export class ListTagsService {
  async execute() {
    const tags = await tagsRepository.find();
    // tags = tags.map(tag => ({ ...tag, nameCustom: `#${tag.name}` }));

    return classToPlain(tags);
  }
}
