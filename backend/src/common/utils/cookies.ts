import { FastifyReply } from 'fastify';

import { CONFIG } from '../config';

export const setAuthCookie = (reply: FastifyReply, token: string) => {
  reply.setCookie('token', token, {
    httpOnly: true,
    secure: CONFIG.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
};
