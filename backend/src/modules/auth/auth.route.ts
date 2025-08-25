import { FastifyInstance } from 'fastify';

import { AuthController } from './auth.controller';
import {
  AuthResponseSchema,
  LoginSchema,
  OAuthCodeSchema,
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
    controller.registerWithEmailPasswordHandler.bind(controller),
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
    controller.loginWithEmailPasswordHandler.bind(controller),
  );

  fastify.post(
    '/github',
    {
      schema: {
        body: OAuthCodeSchema,
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
        body: OAuthCodeSchema,
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

  fastify.post('/logout', controller.logoutHandler.bind(controller));
}
