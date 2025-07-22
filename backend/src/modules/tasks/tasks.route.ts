import { FastifyInstance } from 'fastify';
import z from 'zod';

import {
  createTaskHandler,
  deleteTaskHandler,
  getUserTasksHandler,
  updateTaskHandler,
} from './tasks.controller';
import {
  CreateTaskSchema,
  TaskParamsSchema,
  TaskResponseSchema,
  TasksResponseSchema,
  UpdateTaskSchema,
} from './tasks.schema';

export const taskRoute = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get(
    '/',
    {
      schema: {
        response: {
          201: TasksResponseSchema,
        },
      },
    },
    getUserTasksHandler,
  );

  fastify.post(
    '/',
    {
      schema: {
        body: CreateTaskSchema,
        response: {
          201: TaskResponseSchema,
        },
      },
    },
    createTaskHandler,
  );

  fastify.put(
    '/:id',
    {
      schema: {
        params: TaskParamsSchema,
        body: UpdateTaskSchema,
        response: {
          200: TaskResponseSchema,
        },
      },
    },
    updateTaskHandler,
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: TaskParamsSchema,
        response: {
          204: z.null(),
        },
      },
    },
    deleteTaskHandler,
  );
};
