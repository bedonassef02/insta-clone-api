import { getCurrentUserId } from '../../middleware/get-current-user-id';
import { ContextDto } from '../../utils/dtos/context.dto';
import { CreatePostDto } from '../../utils/dtos/create-post.dto';
import { UpdatePostDto } from '../../utils/dtos/update-post.dto';
import { postService } from '../../utils/ioc/services.ioc';

export const postQueryResolver = {
  posts: async (_: any, { username }: { username: string }) => {
    return await postService.findAll(username);
  },
  post: async (_: any, { id }: { id: number }) => {
    return await postService.findOne(id);
  },
};

export const postMutationResolver = {
  createPost: async (_: any, postDto: CreatePostDto, context: ContextDto) => {
    postDto.authorId = getCurrentUserId(context.req) as number;

    return postService.create(postDto);
  },

  updatePost: async (_: any, postDto: UpdatePostDto) => {
    return postService.update(postDto);
  },

  deletePost: async (_: any, { id }: { id: number }) => {
    return postService.remove(id);
  },
};
