import { FastifyInstance } from 'fastify';

import { loginHandler, registerHandler } from './auth.controller';
import {
  loginResponseSchema,
  loginSchema,
  registerResponseSchema,
  registerSchema,
} from './auth.schema';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/signup',
    {
      schema: {
        body: registerSchema,
        response: {
          201: registerResponseSchema,
        },
      },
    },
    registerHandler,
  );

  fastify.post(
    '/signin',
    {
      schema: {
        body: loginSchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    loginHandler,
  );
}
