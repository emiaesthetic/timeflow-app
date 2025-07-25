import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { TasksRepository } from './tasks.repository';
import {
  CreateTaskPayload,
  TaskParams,
  UpdateTaskPayload,
} from './tasks.schema';
import { TaskService } from './tasks.service';

export class TasksController {
  private taskService: TaskService;

  constructor(prisma: PrismaClient) {
    const tasksRepository = new TasksRepository(prisma);
    this.taskService = new TaskService(tasksRepository);
  }

  async getUserTasksHandler(request: FastifyRequest, reply: FastifyReply) {
    const tasks = await this.taskService.getUserTasks(request.user.id);
    reply.status(200).send(tasks);
  }

  async createTaskHandler(
    request: FastifyRequest<{ Body: CreateTaskPayload }>,
    reply: FastifyReply,
  ) {
    const task = await this.taskService.createTask(
      request.user.id,
      request.body,
    );
    reply.status(201).send(task);
  }

  async updateTaskHandler(
    request: FastifyRequest<{ Params: TaskParams; Body: UpdateTaskPayload }>,
    reply: FastifyReply,
  ) {
    const updatedTask = await this.taskService.updateTask(
      request.params.id,
      request.body,
    );
    reply.status(200).send(updatedTask);
  }

  async deleteTaskHandler(
    request: FastifyRequest<{ Params: TaskParams }>,
    reply: FastifyReply,
  ) {
    await this.taskService.deleteTask(request.params.id);
    reply.status(204).send(null);
  }
}
