import axios, { AxiosError, AxiosInstance } from 'axios';

let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = ({
  error,
  token,
}: {
  error?: AxiosError;
  token?: string;
}) => {
  if (error) failedQueue.forEach(promise => promise.reject(error));
  if (token) failedQueue.forEach(promise => promise.resolve(token));
  failedQueue = [];
};

export const publicHttpClient = axios.create({
  withCredentials: true,
});

export const createAuthenticatedHttpClient = ({
  getAccessToken,
  refreshToken,
}: {
  getAccessToken: () => string | null;
  refreshToken: () => Promise<string | undefined>;
}) => {
  const httpClient = axios.create({
    withCredentials: true,
  });

  httpClient.interceptors.request.use(
    config => {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  httpClient.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        if (originalRequest._retry) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axios(originalRequest).catch(reject));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;

        try {
          const token = await refreshToken();
          processQueue({ token });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
          processQueue({ error: error as AxiosError });
          return Promise.reject(error);
        } finally {
          originalRequest._retry = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return httpClient;
};

export let authenticatedHttpClient: AxiosInstance | null = null;

export const setAuthenticatedHttpClient = (instance: AxiosInstance) => {
  authenticatedHttpClient = instance;
};
