import axios, { AxiosError } from 'axios';

import { baseOptions } from './lib/baseOptions';
import { commonErrorInterceptor } from './lib/commonErrorInterceptor';

export const axiosClassic = axios.create(baseOptions);

axiosClassic.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return commonErrorInterceptor(error);
  },
);
