import { CreateComplimentService } from './../services/CreateComplimentService';
import { Request, Response } from 'express';

export class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const { tag_id, user_receiver, message } = req.body;
    const { user_id } = req;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    return res.status(201).json(compliment);
  }
}
