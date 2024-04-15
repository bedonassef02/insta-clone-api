import { getCurrentUserId } from '../../middleware/get-current-user-id';
import { ContextDto } from '../../utils/dtos/context.dto';
import { CreateCommentDto } from '../../utils/dtos/create-comment.dto';
import { commentService } from '../../utils/ioc/services.ioc';

export const commentQueryResolver = {
  comments: async (_: any, { postId }: { postId: number }) => {
    const comments = await commentService.findAll(postId);
    return comments;
  },
};

export const commentMutationResolver = {
  createComment: async (
    _: any,
    { commentDto }: { commentDto: CreateCommentDto },
    context: ContextDto,
  ) => {
    try {
      const userId: number = getCurrentUserId(context.req) as number;
      commentDto.authorId = userId;

      // Call the create method from the comment service
      const newComment = await commentService.create(commentDto);

      return newComment;
    } catch (error) {
      // Handle any errors, e.g., logging or returning an error message
      console.error('Error creating comment:', error);
      throw new Error('Failed to create comment');
    }
  },
};
