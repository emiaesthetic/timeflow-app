import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import { ApiError } from './apiError';

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ApiError) {
    reply
      .status(error.statusCode)
      .send({ message: error.message, errors: error.errors });
  } else if (error.validation) {
    reply
      .status(400)
      .send({ message: 'Validation error', error: error.validation });
  } else {
    request.log.error(error);
    reply.status(500).send({ message: 'Internal Server Error' });
  }
};
