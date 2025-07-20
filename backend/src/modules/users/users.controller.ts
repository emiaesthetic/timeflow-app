import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UsersRepository } from './users.repository';
import { UpdateUserPayload } from './users.schema';
import { UserService } from './users.service';

export async function getCurrentUserHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);

  const { id } = request.user;
  const userData = (await userService.getUserById(id)) as User;

  reply.status(200).send({
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
  });
}

export async function updateCurrentUserHandler(
  request: FastifyRequest<{ Body: UpdateUserPayload }>,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);

  const { id } = request.user;
  const updatedUserData = await userService.updateUser(id, request.body);

  reply.status(200).send({
    id: updatedUserData.id,
    email: updatedUserData.email,
    name: updatedUserData.name,
    picture: updatedUserData.picture,
  });
}

export async function deleteCurrentUserHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);

  const { id } = request.user;
  await userService.deleteUser(id);

  reply.status(204).send();
}
