import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from '../utils/dtos/create-post.dto';

const prisma = new PrismaClient();

export class PostService {
  async findAll(username: string): Promise<any> {
    return prisma.post.findMany({ where: { author: { username } } });
  }

  async create(postDto: CreatePostDto, authorId: number) {
    return prisma.post.create({
      data: {
        title: postDto.title,
        content: postDto.content,
        authorId,
      },
    });
  }
}
