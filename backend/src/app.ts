import Fastify from 'fastify';
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { errorHandler } from './common/errors/errorHandler';
import { prismaPlugin } from './common/plugins/dbPlugin';
import { userRoutes } from './modules/users/user.route';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(errorHandler);

  await app.register(prismaPlugin);

  await app.register(userRoutes, { prefix: '/api/v1/user' });

  return app;
}
