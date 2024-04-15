import { prisma } from '../prisma';
import { CreateCommentDto } from '../utils/dtos/create-comment.dto';

export class CommentService {
  async findAll(postId: number) {
    return await prisma.comment.findMany({ where: { postId } });
  }

  async findOne(commentId: number) {
    return await prisma.comment.findUnique({ where: { id: commentId } });
  }

  async create(commentDto: CreateCommentDto) {
    return await prisma.comment.create({
      data: {
        content: commentDto.content,
        postId: commentDto.postId,
        authorId: commentDto.authorId,
      },
    });
  }

  async update(commentId: number, updateDto: CreateCommentDto) {
    return await prisma.comment.update({
      where: { id: commentId },
      data: updateDto,
    });
  }

  async delete(commentId: number) {
    return await prisma.comment.delete({ where: { id: commentId } });
  }
}
