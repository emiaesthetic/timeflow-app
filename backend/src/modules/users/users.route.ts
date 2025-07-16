import { FastifyInstance } from 'fastify';
import z from 'zod';

import {
  deleteCurrentUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
} from './users.controller';
import { updateUserSchema, userResponseSchema } from './users.schema';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get(
    '/me',
    {
      schema: {
        response: {
          200: userResponseSchema,
        },
      },
    },
    getCurrentUserHandler,
  );

  fastify.put(
    '/me',
    {
      schema: {
        body: updateUserSchema,
        response: {
          200: userResponseSchema,
        },
      },
    },
    updateCurrentUserHandler,
  );

  fastify.delete(
    '/me',
    {
      schema: {
        response: {
          204: z.null(),
        },
      },
    },
    deleteCurrentUserHandler,
  );
}
