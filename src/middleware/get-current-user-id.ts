import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { JWT_SECRET } from '../utils/constants';

export const getCurrentUserId = (req: Request): number | null => {
  const token = req.headers.authorization;

  if (token) {
    try {

      const decodedToken: any = jwt.verify(
        token,
        JWT_SECRET
      );

      const userId = decodedToken.userId;

      return userId;
    } catch (error) {
      return null;
    }
  }

  return null;
};
