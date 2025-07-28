import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { CONFIG } from '../config';

const options: CreateAxiosDefaults = {
  baseURL: CONFIG.SERVER_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
};

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = ({
  error,
  token,
}: {
  error?: AxiosError;
  token: string | null;
}) => {
  if (error) failedQueue.forEach(promise => promise.reject(error));
  if (token) failedQueue.forEach(promise => promise.resolve(token));
  failedQueue = [];
};

export const axiosClassic = axios.create(options);
export const axiosWithAuth = axios.create(options);

function ejectInterceptors() {
  axiosWithAuth.interceptors.request.clear();
  axiosWithAuth.interceptors.response.clear();
}

export const initAxiosWithAuth = ({
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
          processQueue({ error: error as AxiosError, token: null });
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
