import { usersRepository } from './../repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req;
  const user = await usersRepository.findOneBy({ id: user_id });

  if (user?.admin) {
    return next();
  }

  return res.status(401).json({ error: 'Resource denied by user permissions' });
}
