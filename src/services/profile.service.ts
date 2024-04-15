import { prisma } from '../prisma';

export class ProfileService {
  async findByUserId(userId: number): Promise<any> {
    return await prisma.profile.findUnique({ where: { userId } });
  }
  async update(userId: number, bio: string) {
    const profile = await this.findByUserId(userId);
    return prisma.profile.update({ where: { id: profile.id }, data: { bio } });
  }
}
