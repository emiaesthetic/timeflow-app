import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import { ApiError } from './apiError';

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).name === 'ApiError'
  );
};

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (isApiError(error)) {
    reply
      .status((error as ApiError).statusCode)
      .send({ message: error.message, errors: (error as ApiError).errors });
  } else if (error.validation) {
    reply
      .status(400)
      .send({ message: 'Validation error', error: error.validation });
  } else {
    request.log.error(error);
    reply.status(500).send({ message: 'Internal Server Error' });
  }
};
