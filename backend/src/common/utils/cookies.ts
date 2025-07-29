import { CookieSerializeOptions } from '@fastify/cookie';
import { FastifyReply } from 'fastify';

import { CONFIG } from '../config';

const options: CookieSerializeOptions = {
  httpOnly: true,
  secure: CONFIG.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export const setRefreshTokenCookie = (
  reply: FastifyReply,
  refreshToken: string,
) => {
  reply.setCookie('refreshToken', refreshToken, {
    ...options,
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearRefreshTokenCookie = (reply: FastifyReply) => {
  reply.clearCookie('refreshToken', { ...options, maxAge: 0 });
};
