import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { AUTH } from '@/common/config';
import { ApiError } from '@/common/errors/apiError';

import { OAuthUserProfile } from './auth.schema';

type TokenResponse = {
  access_token: string;
};

type UserResponse = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export class GoogleOAuthService {
  private apiClient: AxiosInstance;
  private tokenClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: AUTH.GOOGLE.API_URL,
      headers: { Accept: 'application/json' },
    });
    this.tokenClient = axios.create({
      baseURL: AUTH.GOOGLE.TOKEN_URL,
      headers: { Accept: 'application/json' },
    });
  }

  private async exchangeCodeForToken(code: string) {
    try {
      const response: AxiosResponse<TokenResponse> =
        await this.tokenClient.post('', null, {
          params: AUTH.GOOGLE.getTokenExchangeParams(code),
        });
      return response.data.access_token;
    } catch (error) {
      throw ApiError.googleAuthFailed(
        'Failed to exchange Google code for token.',
        error,
      );
    }
  }

  private async fetchUserProfile(token: string) {
    try {
      const response: AxiosResponse<UserResponse> = await this.apiClient.get(
        'userinfo',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw ApiError.googleAuthFailed(
        'Failed to fetch Google user profile.',
        error,
      );
    }
  }

  private mapGoogleProfile(rawProfile: UserResponse): OAuthUserProfile {
    return {
      email: rawProfile.email,
      name: rawProfile.name,
      picture: rawProfile.picture,
      provider: 'GOOGLE',
      providerAccountId: rawProfile.id,
    };
  }

  async authenticate(code: string) {
    const token = await this.exchangeCodeForToken(code);
    const rawProfile = await this.fetchUserProfile(token);
    const unifiedProfile = this.mapGoogleProfile(rawProfile);

    return unifiedProfile;
  }
}
