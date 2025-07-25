import { FastifyInstance } from 'fastify';
import z from 'zod';

import { UsersController } from './users.controller';
import { UpdateUserSchema, UserResponseSchema } from './users.schema';

export async function usersRoutes(fastify: FastifyInstance) {
  const controller = new UsersController(fastify.prisma);

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
    controller.getCurrentUserHandler.bind(controller),
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
    controller.updateCurrentUserHandler.bind(controller),
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
    controller.deleteCurrentUserHandler.bind(controller),
  );
}
