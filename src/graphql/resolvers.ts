import { Request } from 'express';
import { getCurrentUserId } from '../middleware/get-current-user-id';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { AuthDto } from '../utils/dtos/auth.dto';
import { CreatePostDto } from '../utils/dtos/create-post.dto';
import { ProfileService } from '../services/profile.service';

const userService = new UserService();

const authService = new AuthService(userService);

const postService = new PostService();

const profileService = new ProfileService();

export const resolvers = {
  Query: {
    users: () => userService.findAll(),
    user: async (_: any, { username }: { username: string }) => {
      const user = await userService.findOne(username);
      return {
        ...user,
        posts: user ? user.posts : [],
        profile: user ? user.profile : undefined,
      };
    },
    posts: async (_: any, { username }: { username: string }) => {
      const posts = await postService.findAll(username);
      return posts;
    },
  },
  Mutation: {
    register: async (_: any, registerDto: AuthDto) => {
      return authService.register(registerDto);
    },
    login: async (_: any, loginDto: AuthDto) => {
      return authService.login(loginDto);
    },
    createPost: async (
      _: any,
      postDto: CreatePostDto,
      context: { req: Request },
    ) => {
      // Get the current user's ID from the request context
      const loggedInUserId = getCurrentUserId(context.req);

      if (!loggedInUserId) {
        throw new Error('User not authenticated');
      }

      // Create the post with the author's ID
      return postService.create(postDto, loggedInUserId);
    },
  },
};
