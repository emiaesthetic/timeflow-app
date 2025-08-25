import { createId } from '@paralleldrive/cuid2';
import { PrismaClient, User } from '@prisma/client';

import { CreateUserPayload, UpdateUserPayload } from './users.schema';

export class UsersRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateUserPayload): Promise<User> {
    const generateId = createId();

    return this.prisma.user.create({
      data: {
        ...data,
        id: generateId,
        providerAccountId: data.providerAccountId ?? generateId,
      },
    });
  }

  async update(id: string, data: UpdateUserPayload): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string | null): Promise<User | null> {
    if (!email) return null;
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByProvider(
    provider: User['provider'],
    providerAccountId: string,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { provider, providerAccountId },
    });
  }
}
