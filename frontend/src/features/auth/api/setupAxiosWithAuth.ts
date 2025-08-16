import { AxiosError } from 'axios';

import { ApiErrorResponse, axiosWithAuth, queryClient } from '@/shared/api';
import { commonErrorInterceptor } from '@/shared/api';

import { authStore } from '../model/authStore';

import { authApi } from './authApi';

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

export const setupAxiosWithAuth = () => {
  ejectInterceptors();

  axiosWithAuth.interceptors.request.use(config => {
    const token = authStore.getState().token;

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
          const { token } = await authApi.refresh();
          authStore.getState().setToken(token);
          processQueue({ token });
          return axiosWithAuth(originalRequest);
        } catch (error) {
          authStore.getState().clearToken();
          queryClient.clear();
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
