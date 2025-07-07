import { FastifyInstance } from 'fastify';

import { createUserHandler, getUserByIdHandler } from './user.controller';
import {
  createUserResponseSchema,
  createUserSchema,
  getUserParamsSchema,
  userResponseSchema,
} from './user.schema';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    createUserHandler,
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: getUserParamsSchema,
        response: {
          200: userResponseSchema,
        },
      },
    },
    getUserByIdHandler,
  );
}
