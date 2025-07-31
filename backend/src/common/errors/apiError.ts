type Details = Record<string, unknown>;

type ApiErrorOptions = {
  statusCode?: number;
  message?: string;
  errorCode?: string;
  details?: Details;
  originalError?: unknown;
};

export class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details: Details;
  public originalError: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message || 'An unexpected error has occurred.');

    this.name = 'ApiError';
    this.statusCode = options.statusCode || 500;
    this.errorCode = options.errorCode || 'UNKNOWN_ERROR';
    this.details = options.details || {};
    this.originalError = options.originalError;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message = 'Invalid request', details?: Details): ApiError {
    return new ApiError({
      message,
      statusCode: 400,
      errorCode: 'BAD_REQUEST',
      details,
    });
  }

  static unauthorized(message = 'Unauthorized', details?: Details): ApiError {
    return new ApiError({
      message,
      statusCode: 401,
      errorCode: 'UNAUTHORIZED',
      details,
    });
  }

  static forbidden(message = 'Access denied', details?: Details): ApiError {
    return new ApiError({
      message,
      statusCode: 403,
      errorCode: 'FORBIDDEN',
      details,
    });
  }

  static notFound(message = 'Resource not found', details?: Details): ApiError {
    return new ApiError({
      message,
      statusCode: 404,
      errorCode: 'NOT_FOUND',
      details,
    });
  }

  static conflict(message = 'Data conflict', details?: Details): ApiError {
    return new ApiError({
      message,
      statusCode: 409,
      errorCode: 'CONFLICT',
      details,
    });
  }

  static internal(
    message = 'Server Error',
    details?: Details,
    originalError?: unknown,
  ): ApiError {
    return new ApiError({
      message,
      statusCode: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      details,
      originalError,
    });
  }

  static validation(
    errors: Record<string, string[]>,
    message = 'Validation error',
  ): ApiError {
    return new ApiError({
      message,
      statusCode: 422,
      errorCode: 'VALIDATION_ERROR',
      details: { errors },
    });
  }

  static invalidCredentials(): ApiError {
    return new ApiError({
      message: 'Invalid email or password',
      statusCode: 401,
      errorCode: 'INVALID_CREDENTIALS',
    });
  }

  static githubAuthFailed(message: string, originalError?: unknown): ApiError {
    return new ApiError({
      message,
      statusCode: 400,
      errorCode: 'GITHUB_AUTH_FAILED',
      originalError,
    });
  }

  static googleAuthFailed(message: string, originalError?: unknown): ApiError {
    return new ApiError({
      message,
      statusCode: 400,
      errorCode: 'GOOGLE_AUTH_FAILED',
      originalError,
    });
  }
}
