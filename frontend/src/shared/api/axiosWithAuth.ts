import axios, { AxiosError } from 'axios';

import { ApiErrorResponse } from './lib/apiErrorResponse';
import { baseOptions } from './lib/baseOptions';
import { commonErrorInterceptor } from './lib/commonErrorInterceptor';

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = ({
  error,
  token,
}: {
  error?: ApiErrorResponse;
  token: string | null;
}) => {
  if (error) failedQueue.forEach(promise => promise.reject(error));
  if (token) failedQueue.forEach(promise => promise.resolve(token));
  failedQueue = [];
};

const ejectInterceptors = () => {
  axiosWithAuth.interceptors.request.clear();
  axiosWithAuth.interceptors.response.clear();
};

const axiosWithAuth = axios.create(baseOptions);

const initAxiosWithAuth = ({
  token,
  refresh,
}: {
  token: string | null;
  refresh: () => Promise<string>;
}) => {
  ejectInterceptors();

  axiosWithAuth.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosWithAuth.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axiosWithAuth(originalRequest).catch(reject));
              },
              reject,
            });
          });
        }

        isRefreshing = true;

        try {
          const newToken = await refresh();
          processQueue({ token: newToken });
          return axiosWithAuth(originalRequest);
        } catch (error) {
          const refreshError = error as ApiErrorResponse;
          processQueue({ error: refreshError, token: null });
        } finally {
          isRefreshing = false;
        }
      }

      return commonErrorInterceptor(error);
    },
  );
};

export { axiosWithAuth, initAxiosWithAuth };
