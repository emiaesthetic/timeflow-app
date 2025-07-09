import { FastifyInstance } from 'fastify';
import z from 'zod';

import {
  deleteCurrentUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
} from './users.controller';
import { updateUserSchema, userResponseSchema } from './users.schema';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/me',
    {
      preHandler: async request => {
        await request.jwtVerify();
      },
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
      preHandler: async request => {
        await request.jwtVerify();
      },
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
      preHandler: async request => {
        await request.jwtVerify();
      },
      schema: {
        response: {
          204: z.null(),
        },
      },
    },
    deleteCurrentUserHandler,
  );
}
