import { AxiosResponse } from 'axios';

import { client } from '@/shared/api';
import { API } from '@/shared/config';

import { LoginFormData, RegisterFormData, User } from '../model/types';

export const authApi = {
  getCurrentUser: async () => {
    const response: AxiosResponse<User> = await client.get(
      `${API.users('me')}`,
    );

    return response.data;
  },

  register: async (payload: RegisterFormData) => {
    const response: AxiosResponse<User> = await client.post(
      `${API.auth('signup')}`,
      { ...payload },
    );
    return response.data;
  },

  login: async (payload: LoginFormData) => {
    const response: AxiosResponse<User> = await client.post(
      `${API.auth('signin')}`,
      { ...payload },
    );
    return response.data;
  },

  loginWithGithub: async (code: string) => {
    const response: AxiosResponse<User> = await client.post(
      `${API.auth('github')}`,
      { code },
    );

    return response.data;
  },

  loginWithGoogle: async (code: string) => {
    const response: AxiosResponse<User> = await client.post(
      `${API.auth('google')}`,
      { code },
    );

    return response.data;
  },
};
