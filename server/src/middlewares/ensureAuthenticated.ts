import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization?.split(' ')[1];
  if (!authToken) return res.status(401).end();

  try {
    const { sub } = verify(authToken, 'secret') as IPayLoad;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
