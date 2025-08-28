import { AxiosResponse } from 'axios';

import { axiosWithAuth } from '@/shared/api';
import { API } from '@/shared/config';

import { User } from '../model/types';

export const userApi = {
  getMe: async () => {
    const response: AxiosResponse<User> = await axiosWithAuth.get(
      API.users('me'),
    );

    return response.data;
  },

  updateMe: async (payload: Partial<User>) => {
    const response: AxiosResponse<User> = await axiosWithAuth.patch(
      API.users('me'),
      { ...payload },
    );

    return response.data;
  },

  deleteMe: async () => {
    await axiosWithAuth.delete(API.users('me'));
  },
};
