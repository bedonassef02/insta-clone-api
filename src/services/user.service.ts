import { PrismaClient } from '@prisma/client';
import { AuthDto } from '../utils/dtos/auth.dto';

const prisma = new PrismaClient();

export class UserService {
  async findOne(username: string) {
    return await prisma.user.findUnique({ where: { username } });
  }

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async create(authDto: AuthDto) {
    return await prisma.user.create({
      data: {
        username: authDto.username,
        password: authDto.password,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });
  }
}
