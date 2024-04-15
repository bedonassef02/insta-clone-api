import { Request } from 'express';
import { getCurrentUserId } from '../middleware/get-current-user-id';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { AuthDto } from '../utils/dtos/auth.dto';

const userService = new UserService();

const authService = new AuthService(userService);

const postService = new PostService();

export const resolvers = {
  Query: {
    users: () => userService.findAll(),
    user: (_: any, { id }: { id: number }) => userService.findById(id),
  },
  Mutation: {
    register: async (_: any, registerDto: AuthDto) => {
      return authService.register(registerDto);
    },
    login: async (_: any, loginDto: AuthDto) => {
      return authService.login(loginDto);
    },
    createPost: async (_: any, { title, content }: { title: string, content: string }, context: { req: Request }) => {
      // Get the current user's ID from the request context
      const loggedInUserId = getCurrentUserId(context.req);
    
      if (!loggedInUserId) {
        throw new Error('User not authenticated');
      }
    
      // Create the post with the author's ID
      return postService.create(title, content, loggedInUserId);
    },
    
  },
};
