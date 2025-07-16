import { PrismaClient, Task } from '@prisma/client';

import { CreateTaskDto, UpdateTaskDto } from './tasks.schema';

export class TasksRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(userId: string, data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: { ...data, user: { connect: { id: userId } } },
    });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }

  async getById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }
}
