import { isApiErrorResponse } from './apiErrorResponse';

export const errorMessages: Record<string, string> = {
  UNKNOWN_ERROR: 'An unknown error occurred.',
  INTERNAL_SERVER_ERROR: 'A server error occurred. Please try again later.',
  UNAUTHORIZED: 'Please log in again.',
  FORBIDDEN: 'You do not have access to this resource.',
  VALIDATION_ERROR: 'Some fields are invalid. Please check the form.',

  FRONTEND_NETWORK_ERROR: 'Network error. Please check your connection.',
  FRONTEND_UNEXPECTED_ERROR_FORMAT:
    'Unexpected error format received from server.',
  FRONTEND_REQUEST_SETUP_ERROR: 'Failed to prepare request. Please try again.',

  INVALID_CREDENTIALS: 'Invalid email or password.',
  GITHUB_AUTH_FAILED: 'GitHub authentication failed. Please try again.',
  GOOGLE_AUTH_FAILED: 'Google authentication failed. Please try again.',
};

export function getErrorMessage(error: unknown): string {
  if (isApiErrorResponse(error)) {
    return errorMessages[error.error.code] || error.error.message;
  }

  return 'An unknown error occurred.';
}
