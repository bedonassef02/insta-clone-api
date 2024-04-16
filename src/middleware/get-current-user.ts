import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { JWT_SECRET } from '../utils/constants';

export const getCurrentUser = (req: Request): any => {
  const token = req.headers.authorization;

  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  return null;
};
