import { PrismaClient, RefreshToken } from '@prisma/client';

import { RefreshTokenPayload } from './auth.schema';

export class AuthRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: RefreshTokenPayload): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({ data });
  }

  async update(data: RefreshTokenPayload): Promise<RefreshToken> {
    return this.prisma.refreshToken.update({
      where: { userId: data.userId },
      data,
    });
  }

  async delete(token: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
  }

  async findByUserId(userId: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({ where: { userId } });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({ where: { token } });
  }
}
