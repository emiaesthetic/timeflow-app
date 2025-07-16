import { Task } from '@prisma/client';

import { ApiError } from '@/common/errors/apiError';

import { TasksRepository } from './tasks.repository';
import { CreateTaskDto, UpdateTaskDto } from './tasks.schema';

export class TaskService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async getTaskById(id: string): Promise<Task | null> {
    const task = await this.tasksRepository.getById(id);
    if (!task) {
      throw ApiError.notFound('Task not found');
    }
    return task;
  }

  async createTask(userId: string, dto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.create(userId, dto);
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    await this.getTaskById(id);
    return await this.tasksRepository.update(id, dto);
  }

  async deleteTask(id: string): Promise<void> {
    await this.getTaskById(id);
    await this.tasksRepository.delete(id);
  }
}
