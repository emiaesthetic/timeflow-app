import { FastifyInstance } from 'fastify';
import z from 'zod';

import { TasksController } from './tasks.controller';
import {
  CreateTaskSchema,
  TaskParamsSchema,
  TaskResponseSchema,
  TasksResponseSchema,
  UpdateTaskSchema,
} from './tasks.schema';

export const tasksRoutes = async (fastify: FastifyInstance) => {
  const controller = new TasksController(fastify.prisma);

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
    controller.getUserTasksHandler.bind(controller),
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
    controller.createTaskHandler.bind(controller),
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
    controller.updateTaskHandler.bind(controller),
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
    controller.deleteTaskHandler.bind(controller),
  );
};
