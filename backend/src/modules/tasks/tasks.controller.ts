import { FastifyReply, FastifyRequest } from 'fastify';

import { TasksRepository } from './tasks.repository';
import { CreateTaskDto, TaskId, UpdateTaskDto } from './tasks.schema';
import { TaskService } from './tasks.service';

export const createTaskHandler = async (
  request: FastifyRequest<{ Body: CreateTaskDto }>,
  reply: FastifyReply,
) => {
  const tasksRepository = new TasksRepository(request.prisma);
  const taskService = new TaskService(tasksRepository);

  const { id: userId } = request.user;

  const task = await taskService.createTask(userId, request.body);

  reply.status(201).send(task);
};

export const updateTaskHandler = async (
  request: FastifyRequest<{ Params: TaskId; Body: UpdateTaskDto }>,
  reply: FastifyReply,
) => {
  const tasksRepository = new TasksRepository(request.prisma);
  const taskService = new TaskService(tasksRepository);

  const updatedTask = await taskService.updateTask(
    request.params.id,
    request.body,
  );
  reply.status(200).send(updatedTask);
};

export const deleteTaskHandler = async (
  request: FastifyRequest<{ Params: TaskId }>,
  reply: FastifyReply,
) => {
  const tasksRepository = new TasksRepository(request.prisma);
  const taskService = new TaskService(tasksRepository);

  await taskService.deleteTask(request.params.id);
  reply.status(204).send();
};
