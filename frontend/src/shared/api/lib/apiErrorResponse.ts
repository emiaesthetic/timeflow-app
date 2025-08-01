type Details = Record<string, unknown>;

type Error = {
  code: string;
  message: string;
  details: Details;
};

type ApiErrorResponse = {
  success: boolean;
  error: Error;
};

const isApiErrorResponse = (error: unknown): error is ApiErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' in error &&
    error.success === false &&
    'error' in error &&
    typeof error.error === 'object' &&
    error.error !== null &&
    'code' in error.error &&
    'message' in error.error
  );
};

export type { ApiErrorResponse };
export { isApiErrorResponse };
