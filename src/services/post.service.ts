import { prisma } from '../prisma';
import { CreatePostDto } from '../utils/dtos/create-post.dto';
import { UpdatePostDto } from '../utils/dtos/update-post.dto';

export class PostService {
  async findAll(username: string): Promise<any> {
    const author: any = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    return prisma.post.findMany({ where: { authorId: author.id } });
  }

  async findOne(id: number): Promise<any> {
    return prisma.post.findUnique({
      where: { id },
      include: {
        comments: true,
      },
    });
  }

  async create(postDto: CreatePostDto) {
    return prisma.post.create({
      data: {
        title: postDto.title,
        content: postDto.content,
        authorId: postDto.authorId,
      },
    });
  }

  async update(postDto: UpdatePostDto) {
    return prisma.post.update({
      where: { id: postDto.id },
      data: {
        content: postDto.content,
      },
    });
  }

  async remove(id: number) {
    await prisma.post.delete({
      where: { id },
    });
  }
}
