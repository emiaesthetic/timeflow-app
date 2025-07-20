import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    user: { id: string; provider: string; providerAccountId: string };
    prisma: PrismaClient;
  }

  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
