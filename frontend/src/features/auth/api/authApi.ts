import { AxiosResponse } from 'axios';

import { publicHttpClient } from '@/shared/api/httpClient';
import { API } from '@/shared/config';

import { AuthResponse, LoginFormData, RegisterFormData } from '../model/types';

export const authApi = {
  register: async (payload: RegisterFormData) => {
    const response: AxiosResponse<AuthResponse> = await publicHttpClient.post(
      `${API.auth('signup')}`,
      { ...payload },
    );
    return response.data;
  },

  login: async (payload: LoginFormData) => {
    const response: AxiosResponse<AuthResponse> = await publicHttpClient.post(
      `${API.auth('signin')}`,
      { ...payload },
    );
    return response.data;
  },

  loginWithGithub: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await publicHttpClient.post(
      `${API.auth('github')}`,
      { code },
    );

    return response.data;
  },

  loginWithGoogle: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await publicHttpClient.post(
      `${API.auth('google')}`,
      { code },
    );

    return response.data;
  },

  refreshToken: async () => {
    const response: AxiosResponse<AuthResponse> = await publicHttpClient.post(
      `${API.auth('refresh')}`,
    );

    return response.data;
  },
};
