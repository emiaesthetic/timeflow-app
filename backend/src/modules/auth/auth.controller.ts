import { FastifyReply, FastifyRequest } from 'fastify';

import { UsersRepository } from '../users/users.repository';
import { UserService } from '../users/users.service';

import { LoginPayload, RegisterPayload } from './auth.schema';
import { AuthService } from './auth.service';

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterPayload }>,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);
  const authService = new AuthService(userService);

  const userData = await authService.register(request.body);
  const token = await reply.jwtSign({ id: userData.id, email: userData.email });

  reply.status(201).send({
    token,
    user: {
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
    },
  });
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginPayload }>,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);
  const authService = new AuthService(userService);

  const userData = await authService.login(request.body);
  const token = await reply.jwtSign({ id: userData.id, email: userData.email });

  reply.status(200).send({
    token,
    user: {
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
    },
  });
}
