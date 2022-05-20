import { ListUserReceiveComplimentsService } from './../services/ListUserReceiveComplimentsService';
import { Request, Response } from 'express';

export class ListUserReceiveComplimentsController {
  async handle(req: Request, res: Response) {
    const listUserReceiveComplimentsService =
      new ListUserReceiveComplimentsService();
    const compliments = await listUserReceiveComplimentsService.execute(
      req.user_id,
    );
    return res.json(compliments);
  }
}
