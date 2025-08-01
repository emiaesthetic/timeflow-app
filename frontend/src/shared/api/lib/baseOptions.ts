import { CreateAxiosDefaults } from 'axios';

import { CONFIG } from '@/shared/config';

export const baseOptions: CreateAxiosDefaults = {
  baseURL: CONFIG.SERVER_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
};
