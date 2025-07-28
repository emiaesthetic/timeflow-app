import { AxiosResponse } from 'axios';

import { axiosClassic } from '@/shared/api';
import { API } from '@/shared/config';

import { AuthResponse, LoginFormData, RegisterFormData } from '../model/types';

export const authApi = {
  register: async (payload: RegisterFormData) => {
    const response: AxiosResponse<AuthResponse> = await axiosClassic.post(
      `${API.auth('signup')}`,
      { ...payload },
    );
    return response.data;
  },

  login: async (payload: LoginFormData) => {
    const response: AxiosResponse<AuthResponse> = await axiosClassic.post(
      `${API.auth('signin')}`,
      { ...payload },
    );
    return response.data;
  },

  loginWithGithub: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await axiosClassic.post(
      `${API.auth('github')}`,
      { code },
    );

    return response.data;
  },

  loginWithGoogle: async (code: string) => {
    const response: AxiosResponse<AuthResponse> = await axiosClassic.post(
      `${API.auth('google')}`,
      { code },
    );

    return response.data;
  },

  refresh: async () => {
    const response: AxiosResponse<AuthResponse> = await axiosClassic.post(
      `${API.auth('refresh')}`,
    );

    return response.data;
  },
};
