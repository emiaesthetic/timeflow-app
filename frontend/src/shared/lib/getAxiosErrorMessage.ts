import { AxiosError } from 'axios';

export function getAxiosErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message || error.message || 'Unknown Axios error'
    );
  }

  return 'Unexpected error';
}
