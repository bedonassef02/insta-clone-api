import jwt from 'jsonwebtoken';
import { Request } from 'express';

export const getCurrentUserId = (req: Request): number | null => {
  // Get the authorization header from the request
  let token = req.headers.authorization;

  // Check if the authorization header exists and starts with "Bearer "
  if (token) {

    try {
      // Verify the JWT token
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // Extract the user ID from the decoded token
      const userId = decodedToken.userId;

      // Return the user ID
      return userId;
    } catch (error) {
      // If there's an error (e.g., token is invalid or expired), return null
      return null;
    }
  }

  // If there's no authorization header or it's not in the expected format, return null
  return null;
};
