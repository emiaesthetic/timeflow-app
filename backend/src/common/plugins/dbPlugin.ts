import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export const prismaPlugin: FastifyPluginAsync = fp(async fastify => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onRequest', (request, reply, done) => {
    request.prisma = fastify.prisma;
    done();
  });

  fastify.addHook('onClose', async instance => {
    await instance.prisma.$disconnect();
  });
});
