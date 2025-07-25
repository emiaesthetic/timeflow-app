import '@fastify/jwt';
import { PrismaClient } from '@prisma/client';

type AuthCookiePayload = {
  id: string;
  provider: string;
  providerAccountId: string;
};

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
