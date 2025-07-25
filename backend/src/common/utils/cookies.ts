import { FastifyReply } from 'fastify';

import { CONFIG } from '../config';

export const setRefreshTokenCookie = (
  reply: FastifyReply,
  refreshToken: string,
) => {
  reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: CONFIG.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
};
