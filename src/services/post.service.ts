import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PostService {
  async findAll() {
    return prisma.post.findMany();
  }

  async create(title: string, content: string, authorId: number) {
    return prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  }
}
