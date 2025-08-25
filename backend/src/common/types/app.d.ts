import '@fastify/jwt';
import { PrismaClient, User } from '@prisma/client';

type AuthCookiePayload = Pick<User, 'id' | 'provider' | 'providerAccountId'>;

declare module 'fastify' {
  interface FastifyRequest {
    user: AuthCookiePayload;
    prisma: PrismaClient;

    refreshJwtVerify(): Promise<AuthCookiePayload>;
  }

  interface FastifyReply {
    jwtSign(
      payload: AuthCookiePayload,
      options?: FastifyJWT.SignOptions,
    ): Promise<string>;

    refreshJwtSign(
      payload: AuthCookiePayload,
      options?: FastifyJWTSignOptions,
    ): Promise<string>;
  }

  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: AuthCookiePayload;
    refreshPayload: AuthCookiePayload;
  }
}
