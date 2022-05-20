import { usersRepository } from '../repositories/UsersRepository';
import { complimentsRepository } from './../repositories/ComplimentsRepository';
interface ICreateComplimentService {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: ICreateComplimentService) {
    if (user_sender === user_receiver)
      throw new Error('You cannot send a compliment to yourself');

    const userReceiverExists = usersRepository.findOneBy({ id: user_receiver });
    if (!userReceiverExists) throw new Error("User receiver doesn't exists");

    const compliment = complimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepository.save(compliment);
    
    return compliment;
  }
}
