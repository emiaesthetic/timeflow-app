import { PrismaClient, User } from '@prisma/client';

import { RegisterPayload } from '../auth/auth.schema';

import { UpdateUserPayload } from './users.schema';

export class UsersRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: RegisterPayload): Promise<User> {
    console.log(data);
    return this.prisma.user.create({ data });
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

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
