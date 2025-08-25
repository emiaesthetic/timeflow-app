import { User } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { ApiError } from '@/common/errors/apiError';
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from '@/common/utils/cookies';

import { UsersRepository } from '../users/users.repository';
import { UserService } from '../users/users.service';

import {
  LoginPayload,
  OAuthCodePayload,
  PublicUser,
  RegisterPayload,
} from './auth.schema';
import { AuthService } from './auth.service';
import { GithubOAuthService } from './github.service';
import { GoogleOAuthService } from './google.service';
import { RefreshTokenRepository } from './refreshToken/refreshToken.repository';
import { RefreshTokenService } from './refreshToken/refreshToken.service';

export class AuthController {
  private readonly userService: UserService;
  private readonly githubOAuthService: GithubOAuthService;
  private readonly googleOAuthService: GoogleOAuthService;
  private readonly authService: AuthService;
  private readonly refreshTokenService: RefreshTokenService;

  constructor(fastify: FastifyInstance) {
    const userRepository = new UsersRepository(fastify.prisma);
    const tokenRepository = new RefreshTokenRepository(fastify.prisma);

    this.userService = new UserService(userRepository);
    this.githubOAuthService = new GithubOAuthService();
    this.googleOAuthService = new GoogleOAuthService();
    this.authService = new AuthService({
      userService: this.userService,
      githubOAuthService: this.githubOAuthService,
      googleOAuthService: this.googleOAuthService,
    });
    this.refreshTokenService = new RefreshTokenService(tokenRepository);
  }

  async registerWithEmailPasswordHandler(
    request: FastifyRequest<{ Body: RegisterPayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.registerWithEmailPassword(request.body);
    await this.handleAuthResponse({ reply, user: user, status: 201 });
  }

  async loginWithEmailPasswordHandler(
    request: FastifyRequest<{ Body: LoginPayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.loginWithEmailPassword(request.body);
    await this.handleAuthResponse({ reply, user: user });
  }

  async loginWithGithubHandler(
    request: FastifyRequest<{ Body: OAuthCodePayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.loginWithOAuth(
      'GITHUB',
      request.body.code,
    );
    await this.handleAuthResponse({ reply, user });
  }

  async loginWithGoogleHandler(
    request: FastifyRequest<{ Body: OAuthCodePayload }>,
    reply: FastifyReply,
  ) {
    const user = await this.authService.loginWithOAuth(
      'GOOGLE',
      request.body.code,
    );
    await this.handleAuthResponse({ reply, user });
  }

  async refreshTokenHandler(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw ApiError.unauthorized('Refresh token not found');
    }

    try {
      await request.refreshJwtVerify();
      await this.refreshTokenService.findRefreshToken(refreshToken);

      const userId = request.user.id;
      const user = await this.userService.getCurrentUser(userId);
      await this.handleAuthResponse({ reply, user });
    } catch {
      clearRefreshTokenCookie(reply);
      throw ApiError.unauthorized(
        'Invalid or expired refresh token. Please login again.',
      );
    }
  }

  async logoutHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const refreshToken = request.cookies.refreshToken;

      if (!refreshToken) {
        clearRefreshTokenCookie(reply);
        return reply.status(200).send();
      }

      await request.refreshJwtVerify();
      await this.refreshTokenService.deleteRefreshToken(refreshToken);

      clearRefreshTokenCookie(reply);
      reply.status(200).send();
    } catch {
      clearRefreshTokenCookie(reply);
      throw ApiError.unauthorized('Invalid or expired refresh token.');
    }
  }

  private mapUserToPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      provider: user.provider,
    };
  }

  private mapUserToJwtPayload(
    user: User,
  ): Pick<User, 'id' | 'provider' | 'providerAccountId'> {
    return {
      id: user.id,
      provider: user.provider,
      providerAccountId: user.providerAccountId,
    };
  }

  private async generateTokens(reply: FastifyReply, user: User) {
    const jwtPayload = this.mapUserToJwtPayload(user);
    const accessToken = await reply.jwtSign(jwtPayload);
    const refreshToken = await reply.refreshJwtSign(jwtPayload);
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
    const newTokens = await this.generateTokens(reply, user);

    await this.refreshTokenService.upsertRefreshToken({
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
