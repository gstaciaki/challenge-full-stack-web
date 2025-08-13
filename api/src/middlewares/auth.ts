import JWT from '@src/util/jwt';
import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }

  const decoded = JWT.verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
    return;
  }

  // eslint-disable-next-line
  (req as any).user = decoded;

  next();
};
