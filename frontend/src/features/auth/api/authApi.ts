import axios, { AxiosResponse } from 'axios';

import { API } from '@/shared/config';

import {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
  User,
} from '../model/types';

export const authApi = {
  getCurrentUser: async (token: string) => {
    const response: AxiosResponse<User> = await axios.get(
      `${API.users('me')}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },

  register: async (payload: RegisterFormData) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API.auth('signup')}`,
      { ...payload },
    );
    return response.data;
  },

  login: async (payload: LoginFormData) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API.auth('signin')}`,
      { ...payload },
    );
    return response.data;
  },

  loginWithGithub: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API.auth('github')}`,
      { code },
    );

    return response.data;
  },

  loginWithGoogle: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API.auth('google')}`,
      { code },
    );

    return response.data;
  },
};
