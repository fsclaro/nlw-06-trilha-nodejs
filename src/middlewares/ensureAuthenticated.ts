import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPlayLoad {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, 'ec522127fb27fc5b36be8f1615d5b49f') as IPlayLoad;
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
