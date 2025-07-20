import { FastifyInstance } from 'fastify';

import {
  loginHandler,
  loginWithGithubHandler,
  loginWithGoogleHandler,
  registerHandler,
} from './auth.controller';
import {
  AuthResponseSchema,
  LoginSchema,
  OAuthSchema,
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
        body: OAuthSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    loginWithGithubHandler,
  );

  fastify.post(
    '/google',
    {
      schema: {
        body: OAuthSchema,
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    loginWithGoogleHandler,
  );
}
