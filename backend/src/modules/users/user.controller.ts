import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateUserDto, GetUserParams } from './user.schema';
import { UserService } from './user.service';
import { UserRepository } from '@/prisma/repositories/user.repository';

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserDto }>,
  reply: FastifyReply,
) {
  const userRepository = new UserRepository(request.prisma);
  const userService = new UserService(userRepository);

  const userData = request.body;

  const newUser = await userService.createUser(userData);

  const responseData = {
    id: newUser.id,
    email: newUser.email,
  };
  reply.status(201).send(responseData);
}

export async function getUserByIdHandler(
  request: FastifyRequest<{ Params: GetUserParams }>,
  reply: FastifyReply,
) {
  const userRepository = new UserRepository(request.prisma);
  const userService = new UserService(userRepository);

  const { id } = request.params;
  const user = await userService.getUserById(id);

  const responseData = {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  reply.send(responseData);
}
