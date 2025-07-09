import fastifyJwt from '@fastify/jwt';
import Fastify from 'fastify';
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { CONFIG } from './common/config';
import { errorHandler } from './common/errors/errorHandler';
import { prismaPlugin } from './common/plugins/dbPlugin';
import { authRoutes } from './modules/auth/auth.route';
import { userRoutes } from './modules/users/users.route';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  await app.register(fastifyJwt, { secret: CONFIG.JWT_SECRET });
  await app.register(prismaPlugin);

  await app.register(authRoutes, { prefix: '/api/v1/auth' });
  await app.register(userRoutes, { prefix: '/api/v1/users' });

  return app;
}
