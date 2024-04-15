import jwt from 'jsonwebtoken';
import { Request } from 'express';

export const getCurrentUserId = (req: Request): number | null => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedToken: any = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      );

      const userId = decodedToken.userId;

      return userId;
    } catch (error) {
      return null;
    }
  }

  return null;
};
