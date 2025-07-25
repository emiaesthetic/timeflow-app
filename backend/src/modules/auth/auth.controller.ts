import { User } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { ApiError } from '@/common/errors/apiError';
import { setRefreshTokenCookie } from '@/common/utils/cookies';

import { UsersRepository } from '../users/users.repository';
import { UserService } from '../users/users.service';

import { AuthRepository } from './auth.repository';
import {
  AuthCookiePayload,
  LoginPayload,
  OAuthPayload,
  RegisterPayload,
} from './auth.schema';
import { AuthService } from './auth.service';

export class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor(fastify: FastifyInstance) {
    const userRepository = new UsersRepository(fastify.prisma);
    const authRepository = new AuthRepository(fastify.prisma);

    this.userService = new UserService(userRepository);
    this.authService = new AuthService(authRepository, this.userService);
  }

  async registerHandler(
    request: FastifyRequest<{ Body: RegisterPayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.register(request.body);
    await this.handleAuthResponse({ reply, user: user, status: 201 });
  }

  async loginHandler(
    request: FastifyRequest<{ Body: LoginPayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.login(request.body);
    await this.handleAuthResponse({ reply, user: user });
  }

  async loginWithGithubHandler(
    request: FastifyRequest<{ Body: OAuthPayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.loginWithGithub(request.body.code);
    await this.handleAuthResponse({ reply, user });
  }

  async loginWithGoogleHandler(
    request: FastifyRequest<{ Body: OAuthPayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.loginWithGoogle(request.body.code);
    await this.handleAuthResponse({ reply, user });
  }

  async refreshTokenHandler(request: FastifyRequest, reply: FastifyReply) {
    if (!request.cookies.refreshToken) {
      throw ApiError.unauthorized('Refresh token not found');
    }

    try {
      await request.refreshJwtVerify();
      const userId = request.user.id;
      const user = await this.userService.getCurrentUser(userId);
      await this.handleAuthResponse({ reply, user });
    } catch {
      throw ApiError.unauthorized(
        'Invalid or expired refresh token. Please login again.',
      );
    }
  }

  private mapUserToPublicUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    };
  }

  private mapUserToAuthCookiePayload(user: User) {
    return {
      id: user.id,
      provider: user.provider,
      providerAccountId: user.providerAccountId,
    };
  }

  private async generateTokens(
    reply: FastifyReply,
    userData: AuthCookiePayload,
  ) {
    const accessToken = await reply.jwtSign(userData);
    const refreshToken = await reply.refreshJwtSign(userData);
    return { accessToken, refreshToken };
  }

  private async handleAuthResponse({
    reply,
    user,
    status = 200,
  }: {
    reply: FastifyReply;
    user: User;
    status?: number;
  }) {
    const jwtPayload = this.mapUserToAuthCookiePayload(user);
    const newTokens = await this.generateTokens(reply, jwtPayload);

    await this.authService.upsertRefreshToken({
      token: newTokens.refreshToken,
      userId: user.id,
    });
    setRefreshTokenCookie(reply, newTokens.refreshToken);

    reply.status(status).send({
      token: newTokens.accessToken,
      user: this.mapUserToPublicUser(user),
    });
  }
}
