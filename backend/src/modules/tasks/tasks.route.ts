import { FastifyInstance } from 'fastify';
import z from 'zod';

import {
  createTaskHandler,
  deleteTaskHandler,
  updateTaskHandler,
} from './tasks.controller';
import {
  createTaskSchema,
  taskIdSchema,
  taskResponseSchema,
  updateTaskSchema,
} from './tasks.schema';

export const taskRoute = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.post(
    '/',
    {
      schema: {
        body: createTaskSchema,
        response: {
          201: taskResponseSchema,
        },
      },
    },
    createTaskHandler,
  );

  fastify.put(
    '/:id',
    {
      schema: {
        params: taskIdSchema,
        body: updateTaskSchema,
        response: {
          200: taskResponseSchema,
        },
      },
    },
    updateTaskHandler,
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: taskIdSchema,
        response: {
          204: z.null(),
        },
      },
    },
    deleteTaskHandler,
  );
};
