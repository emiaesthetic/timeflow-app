import { FastifyInstance } from 'fastify';
import z from 'zod';

import {
  deleteCurrentUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
} from './users.controller';
import { UpdateUserSchema, UserResponseSchema } from './users.schema';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get(
    '/me',
    {
      schema: {
        response: {
          200: UserResponseSchema,
        },
      },
    },
    getCurrentUserHandler,
  );

  fastify.put(
    '/me',
    {
      schema: {
        body: UpdateUserSchema,
        response: {
          200: UserResponseSchema,
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
