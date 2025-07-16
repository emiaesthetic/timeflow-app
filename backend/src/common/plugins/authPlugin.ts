import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export const authPlugin: FastifyPluginAsync = fp(async fastify => {
  fastify.decorate('authenticate', async request => {
    await request.jwtVerify();
  });
});
