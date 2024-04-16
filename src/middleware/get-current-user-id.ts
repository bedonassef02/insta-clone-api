import { Request } from 'express';
import { getCurrentUser } from './get-current-user';

export const getCurrentUserId = (req: Request): number | null => {
  const user = getCurrentUser(req);

  return user ? user.id : null;
};
