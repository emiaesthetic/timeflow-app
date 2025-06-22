import axios, { AxiosResponse } from 'axios';

import { UserProfile } from '../types';

export const fetchToken = async (code: string): Promise<string | undefined> => {
  if (!code) return;

  try {
    const response: AxiosResponse = await axios(
      `http://localhost:4000/github/token`,
      {
        method: 'POST',
        headers: { Accept: 'application/vnd.github+json' },
        data: { code },
      },
    );

    return response.data['access_token'];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error: ', error);
    return;
  }
};

export const fetchUserProfile = async (
  token: string,
): Promise<UserProfile | undefined> => {
  if (!token) return;

  try {
    const response = await axios(`http://localhost:4000/github/userProfile`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { id, login, email, avatar_url: avatarUrl } = response.data;

    return { id, login, email, avatarUrl };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error: ', error);
    return;
  }
};
