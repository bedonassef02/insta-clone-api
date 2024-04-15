import { getCurrentUserId } from '../../middleware/get-current-user-id';
import { ContextDto } from '../../utils/dtos/context.dto';
import { CreatePostDto } from '../../utils/dtos/create-post.dto';
import { UpdatePostDto } from '../../utils/dtos/update-post.dto';
import { postService } from '../../utils/ioc/services.ioc';

export const postQueryResolver = {
  posts: async (_: any, { username }: { username: string }) => {
    const posts = await postService.findAll(username);
    return posts;
  },
  post: async (_: any, { id }: { id: number }) => {
    const post = await postService.findOne(id);
    return {
      ...post,
      author: post ? post.author : undefined,
    };
  },
};

export const postMutationResolver = {
  createPost: async (_: any, postDto: CreatePostDto, context: ContextDto) => {
    const userId: number = getCurrentUserId(context.req) as number;
    postDto.authorId = userId;

    return postService.create(postDto);
  },

  updatePost: async (
    _: any,
    postDto: UpdatePostDto,
  ) => {
    return postService.update(postDto);
  },

  deletePost: async (_: any, { id }: { id: number }) => {
    return postService.remove(id);
  },
};
