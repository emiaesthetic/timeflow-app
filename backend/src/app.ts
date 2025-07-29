import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import Fastify from 'fastify';
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { CONFIG } from './common/config';
import { errorHandler } from './common/errors/errorHandler';
import { authPlugin } from './common/plugins/authPlugin';
import { prismaPlugin } from './common/plugins/dbPlugin';
import { authRoutes } from './modules/auth/auth.route';
import { tasksRoutes } from './modules/tasks/tasks.route';
import { usersRoutes } from './modules/users/users.route';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  await app.register(cors, {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.register(fastifyCookie);
  await app.register(fastifyJwt, {
    secret: CONFIG.JWT_SECRET,
    sign: { expiresIn: '15m' },
  });
  await app.register(fastifyJwt, {
    secret: CONFIG.JWT_REFRESH_SECRET,
    cookie: { cookieName: 'refreshToken', signed: false },
    namespace: 'refresh',
    sign: { expiresIn: '7d' },
  });

  await app.register(authPlugin);
  await app.register(prismaPlugin);

  await app.register(authRoutes, { prefix: '/api/v1/auth' });
  await app.register(usersRoutes, { prefix: '/api/v1/users' });
  await app.register(tasksRoutes, { prefix: '/api/v1/tasks' });

  return app;
}
