import { FastifyInstance } from 'fastify';

import {
  loginHandler,
  loginWithGithubHandler,
  registerHandler,
} from './auth.controller';
import {
  AuthResponseSchema,
  GithubOAuthSchema,
  LoginSchema,
  RegisterSchema,
} from './auth.schema';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/signup',
    {
      schema: {
        body: RegisterSchema,
        response: {
          201: AuthResponseSchema,
        },
      },
    },
    registerHandler,
  );

  fastify.post(
    '/signin',
    {
      schema: {
        body: LoginSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    loginHandler,
  );

  fastify.post(
    '/github',
    {
      schema: {
        body: GithubOAuthSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    loginWithGithubHandler,
  );
}
