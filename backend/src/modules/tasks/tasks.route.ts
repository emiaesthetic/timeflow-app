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
  fastify.post(
    '/',
    {
      preHandler: async request => {
        await request.jwtVerify();
      },
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
      preHandler: async request => {
        await request.jwtVerify();
      },
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
      preHandler: async request => {
        await request.jwtVerify();
      },
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
