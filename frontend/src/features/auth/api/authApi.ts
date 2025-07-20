import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../config';
import {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
  User,
} from '../model/types';

export const authApi = {
  getCurrentUser: async (token: string) => {
    const response: AxiosResponse<User> = await axios.get(
      `${API_URL.users('me')}`,
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
      `${API_URL.auth('signup')}`,
      { ...payload },
    );
    return response.data;
  },

  login: async (payload: LoginFormData) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL.auth('signin')}`,
      { ...payload },
    );
    return response.data;
  },

  loginWithGithub: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL.auth('github')}`,
      { code },
    );

    return response.data;
  },
};
