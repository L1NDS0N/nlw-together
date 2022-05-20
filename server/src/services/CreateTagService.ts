import { tagsRepository } from '../repositories/TagsRepository';

export class CreateTagService {
  async execute(name: string) {
    if (!name) throw new Error('incorrect name');
    const tagAlreadyExists = await tagsRepository.findOneBy({ name });
    if (tagAlreadyExists) throw new Error('Tag already exists');

    const tag = tagsRepository.create({
      name,
    });
    await tagsRepository.save(tag);

    return tag;
  }
}
