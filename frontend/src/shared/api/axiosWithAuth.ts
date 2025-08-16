import axios, { AxiosError } from 'axios';

import { baseOptions } from './lib/baseOptions';
import { commonErrorInterceptor } from './lib/commonErrorInterceptor';

export const axiosWithAuth = axios.create(baseOptions);

axiosWithAuth.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return commonErrorInterceptor(error);
  },
);
