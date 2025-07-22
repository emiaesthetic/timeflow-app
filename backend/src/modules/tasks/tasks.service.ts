import { Task } from '@prisma/client';

import { ApiError } from '@/common/errors/apiError';

import { TasksRepository } from './tasks.repository';
import { CreateTaskPayload, UpdateTaskPayload } from './tasks.schema';

export class TaskService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async createTask(userId: string, payload: CreateTaskPayload): Promise<Task> {
    return await this.tasksRepository.create(userId, payload);
  }

  async updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
    const existingTask = await this.getTaskById(id);

    if (!existingTask) {
      throw ApiError.notFound('Task not found');
    }

    return await this.tasksRepository.update(id, payload);
  }

  async deleteTask(id: string): Promise<void> {
    const existingTask = await this.getTaskById(id);

    if (!existingTask) {
      throw ApiError.notFound('Task not found');
    }

    await this.tasksRepository.delete(id);
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.tasksRepository.getById(id);
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return await this.tasksRepository.getUserTasks(userId);
  }
}
