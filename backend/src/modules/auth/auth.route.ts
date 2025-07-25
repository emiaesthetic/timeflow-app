import { FastifyInstance } from 'fastify';

import { AuthController } from './auth.controller';
import {
  AuthResponseSchema,
  LoginSchema,
  OAuthSchema,
  RegisterSchema,
} from './auth.schema';

export async function authRoutes(fastify: FastifyInstance) {
  const controller = new AuthController(fastify);

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
    controller.registerHandler.bind(controller),
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
    controller.loginHandler.bind(controller),
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
    controller.loginWithGithubHandler.bind(controller),
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
    controller.loginWithGoogleHandler.bind(controller),
  );

  fastify.post(
    '/refresh',
    {
      schema: {
        response: {
          200: AuthResponseSchema,
        },
      },
    },
    controller.refreshTokenHandler.bind(controller),
  );
}
