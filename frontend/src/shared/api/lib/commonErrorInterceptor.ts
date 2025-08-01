import { AxiosError } from 'axios';

import { ApiErrorResponse, isApiErrorResponse } from './apiErrorResponse';

export const commonErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const errorData = error.response.data;

    if (isApiErrorResponse(errorData)) {
      return Promise.reject(errorData);
    } else {
      return Promise.reject({
        success: false,
        error: {
          code: 'FRONTEND_UNEXPECTED_ERROR_FORMAT',
          message: `An unknown error has occurred.`,
          details: {},
        },
      } as ApiErrorResponse);
    }
  } else if (error.request) {
    return Promise.reject({
      success: false,
      error: {
        code: 'FRONTEND_NETWORK_ERROR',
        message:
          'Network error. Please check your connection or try again later.',
        details: { originalMessage: error.message },
      },
    } as ApiErrorResponse);
  } else {
    return Promise.reject({
      success: false,
      error: {
        code: 'FRONTEND_REQUEST_SETUP_ERROR',
        message: 'Error generating server request.',
        details: { originalMessage: error.message },
      },
    } as ApiErrorResponse);
  }
};
