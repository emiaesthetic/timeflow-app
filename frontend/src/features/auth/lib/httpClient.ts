import axios from 'axios';

import { authStore } from '../model/authStore';

export const httpClient = axios.create();

httpClient.interceptors.request.use(config => {
  const token = authStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
