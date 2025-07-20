import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string; provider: string; providerAccountId: string };
    user: { id: string; provider: string; providerAccountId: string };
  }
}
