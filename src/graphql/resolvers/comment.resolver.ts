import { getCurrentUserId } from '../../middleware/get-current-user-id';
import { ContextDto } from '../../utils/dtos/context.dto';
import { CreateCommentDto } from '../../utils/dtos/create-comment.dto';
import { commentService } from '../../utils/ioc/services.ioc';

export const commentQueryResolver = {
  comments: async (_: any, { postId }: { postId: number }) => {
    return await commentService.findAll(postId);
  },
};

export const commentMutationResolver = {
  createComment: async (
    _: any,
    { commentDto }: { commentDto: CreateCommentDto },
    context: ContextDto,
  ) => {
    try {
      commentDto.authorId = getCurrentUserId(context.req) as number;

      return await commentService.create(commentDto);
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Failed to create comment');
    }
  },
};
