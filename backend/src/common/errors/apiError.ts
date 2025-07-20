export class ApiError extends Error {
  public statusCode: number;
  public errors: string[] | object | null;

  constructor(
    statusCode: number,
    message: string,
    errors: string[] | object | null = null,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, ApiError);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message: string = 'Not Found'): ApiError {
    return new ApiError(404, message);
  }

  static conflict(message: string = 'Conflict'): ApiError {
    return new ApiError(409, message);
  }

  static internal(
    message: string = 'Internal Server Error',
    errors: string[] | object | null = null,
  ): ApiError {
    return new ApiError(500, message, errors);
  }
}
