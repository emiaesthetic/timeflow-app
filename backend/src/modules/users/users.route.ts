import { FastifyInstance } from 'fastify';
import z from 'zod';

import { UsersController } from './users.controller';
import { UserResponseSchema } from './users.schema';

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

  fastify.patch(
    '/me',
    {
      schema: {
        consumes: ['multipart/form-data'],
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
