import { BaseBusinessError } from '@src/errors/base-business.error';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export default class JWT {
  public static signToken(userId: string, isAdmin: boolean): string {
    if (!secret) {
      throw new BaseBusinessError();
    }

    const token = jwt.sign(
      {
        userId,
        isAdmin,
      },
      secret,
      { expiresIn: '1h' },
    );

    return token;
  }

  public static verifyToken(token: string): (jwt.JwtPayload | string) | null {
    if (!secret) {
      throw new BaseBusinessError();
    }

    try {
      return jwt.verify(token, secret);
    } catch {
      return null;
    }
  }
}
