import { FastifyReply, FastifyRequest } from 'fastify';

import { setAuthCookie } from '@/common/utils/cookies';

import { UsersRepository } from '../users/users.repository';
import { UserService } from '../users/users.service';

import { LoginPayload, OAuthPayload, RegisterPayload } from './auth.schema';
import { AuthService } from './auth.service';

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterPayload }>,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);
  const authService = new AuthService(userService);

  const userData = await authService.register(request.body);
  const token = await reply.jwtSign({
    id: userData.id,
    provider: userData.provider,
    providerAccountId: userData.providerAccountId,
  });

  setAuthCookie(reply, token);

  reply.status(201).send({
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
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
  const token = await reply.jwtSign({
    id: userData.id,
    provider: userData.provider,
    providerAccountId: userData.providerAccountId,
  });

  setAuthCookie(reply, token);

  reply.status(200).send({
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
  });
}

export async function loginWithGithubHandler(
  request: FastifyRequest<{ Body: OAuthPayload }>,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);
  const authService = new AuthService(userService);

  const userData = await authService.loginWithGithub(request.body.code);
  const token = await reply.jwtSign({
    id: userData.id,
    provider: userData.provider,
    providerAccountId: userData.providerAccountId,
  });

  setAuthCookie(reply, token);

  reply.status(200).send({
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
  });
}

export async function loginWithGoogleHandler(
  request: FastifyRequest<{ Body: OAuthPayload }>,
  reply: FastifyReply,
) {
  const usersRepository = new UsersRepository(request.prisma);
  const userService = new UserService(usersRepository);
  const authService = new AuthService(userService);

  const userData = await authService.loginWithGoogle(request.body.code);
  const token = await reply.jwtSign({
    id: userData.id,
    provider: userData.provider,
    providerAccountId: userData.providerAccountId,
  });

  setAuthCookie(reply, token);

  reply.status(200).send({
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
  });
}
