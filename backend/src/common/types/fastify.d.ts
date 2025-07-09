import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    user: { id: string; email: string };
    prisma: PrismaClient;
  }

  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
