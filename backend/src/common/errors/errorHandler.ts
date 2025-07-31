import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { ApiError } from './apiError';

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  let apiError: ApiError | null = null;

  if (error.code) {
    switch (error.code) {
      case 'FST_JWT_BAD_REQUEST':
      case 'FST_JWT_BAD_COOKIE_REQUEST':
        apiError = ApiError.badRequest(
          `Invalid token format: ${error.message}`,
          {
            originalCode: error.code,
            originalMessage: error.message,
          },
        );
        break;
      case 'FST_JWT_NO_AUTHORIZATION_IN_HEADER':
      case 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE':
      case 'FST_JWT_AUTHORIZATION_TOKEN_INVALID':
      case 'FST_JWT_AUTHORIZATION_TOKEN_UNTRUSTED':
      case 'FAST_JWT_MISSING_SIGNATURE':
        apiError = ApiError.unauthorized(
          `Authorization token missing or invalid: ${error.message}`,
          {
            originalCode: error.code,
            originalMessage: error.message,
          },
        );
        break;
      case 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED':
        apiError = ApiError.unauthorized(
          'Authorization token has expired. Please login again.',
          {
            originalCode: error.code,
            originalMessage: error.message,
          },
        );
        break;
      case 'ERR_ASSERTION':
        request.log.error(`Fastify JWT Assertion Error: ${error.message}`, {
          code: error.code,
          stack: error.stack,
          request: request.id,
        });
        apiError = ApiError.internal(
          'Server configuration error related to authentication.',
          {
            originalCode: error.code,
            originalMessage: error.message,
          },
          error,
        );
        break;
    }
  }

  if (!apiError && error && typeof error === 'object' && 'name' in error) {
    if (error.name === 'JsonWebTokenError') {
      apiError = ApiError.unauthorized(
        'Invalid token signature or format. Please login again.',
        {
          originalMessage: error.message,
          errorName: error.name,
        },
      );
    } else if (!apiError && error.name === 'TokenExpiredError') {
      apiError = ApiError.unauthorized(
        'Token has expired. Please login again.',
        {
          originalMessage: error.message,
          errorName: error.name,
        },
      );
    }
  }

  if (!apiError && error instanceof ApiError) {
    apiError = error;
    if (error.originalError) {
      request.log.error({
        message: `Original error caught by ApiError: ${error.originalError instanceof Error ? error.originalError.message : 'Unknown'}`,
        stack:
          error.originalError instanceof Error
            ? error.originalError.stack
            : 'N/A',
        request: request.id,
        path: request.url,
      });
    }
  } else if (!apiError && error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        apiError = ApiError.conflict(
          `A record with such data already exists. Field: ${error.meta?.target}`,
          { target: error.meta?.target },
        );
        break;
      case 'P2025':
        apiError = ApiError.notFound('No record found.', {
          details: error.meta,
        });
        break;
      default:
        request.log.error({
          message: `Unhandled Prisma error: ${error.message}`,
          code: error.code,
          meta: error.meta,
          stack: error.stack,
          request: request.id,
          path: request.url,
        });
        apiError = ApiError.internal('Database error.', {}, error);
    }
  } else if (!apiError && error instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    error.errors.forEach(err => {
      if (err.path.length > 0) {
        const field = err.path.join('.');
        errors[field] = errors[field] || [];
        errors[field].push(err.message);
      } else {
        errors['general'] = errors['general'] || [];
        errors['general'].push(err.message);
      }
    });
    apiError = ApiError.validation(errors);
  } else if (
    !apiError &&
    'validationContext' in error &&
    'validation' in error
  ) {
    apiError = ApiError.badRequest(`Validation error: ${error.message}`, {
      validation: error.validation,
      validationContext: error.validationContext,
    });
  }

  if (!apiError) {
    request.log.error({
      message: `Unhandled server error: ${error.message}`,
      stack: error.stack,
      request: request.id,
      path: request.url,
      errorName: error.name,
    });
    apiError = ApiError.internal(
      'An unexpected error occurred on the server.',
      {},
      error,
    );
  }

  reply.status(apiError.statusCode).send({
    success: false,
    error: {
      code: apiError.errorCode,
      message: apiError.message,
      details: apiError.details,
    },
  });
};
