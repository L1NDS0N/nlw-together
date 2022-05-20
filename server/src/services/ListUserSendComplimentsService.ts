import { complimentsRepository } from '../repositories/ComplimentsRepository';
export class ListUserSendComplimentsService {
  async execute(user_id: string) {
    return complimentsRepository.find({
      where: {
        user_sender: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });
  }
}
