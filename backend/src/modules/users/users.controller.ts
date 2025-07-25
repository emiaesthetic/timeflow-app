import { PrismaClient, User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UsersRepository } from './users.repository';
import { UpdateUserPayload } from './users.schema';
import { UserService } from './users.service';

export class UsersController {
  private userService: UserService;

  constructor(prisma: PrismaClient) {
    const usersRepository = new UsersRepository(prisma);
    this.userService = new UserService(usersRepository);
  }

  private toPublicUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    };
  }

  async getCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.getCurrentUser(request.user.id);
    reply.status(200).send(this.toPublicUser(user));
  }

  async updateCurrentUserHandler(
    request: FastifyRequest<{ Body: UpdateUserPayload }>,
    reply: FastifyReply,
  ) {
    const updatedUser = await this.userService.updateUser(
      request.user.id,
      request.body,
    );
    reply.status(200).send(this.toPublicUser(updatedUser));
  }

  async deleteCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
    await this.userService.deleteUser(request.user.id);
    reply.status(204).send(null);
  }
}
