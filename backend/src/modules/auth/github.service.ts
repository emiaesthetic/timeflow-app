import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { AUTH } from '@/common/config';
import { ApiError } from '@/common/errors/apiError';

import { OAuthUserProfile } from './auth.schema';

type TokenResponse = {
  access_token: string;
};

type UserResponse = {
  id: number;
  email: string | null;
  login: string;
  avatar_url: string;
};

type EmailResponse = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'public' | 'private';
};

export class GithubOAuthService {
  private apiClient: AxiosInstance;
  private tokenClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: AUTH.GITHUB.API_URL,
      headers: { Accept: 'application/json' },
    });
    this.tokenClient = axios.create({
      baseURL: AUTH.GITHUB.TOKEN_URL,
      headers: { Accept: 'application/json' },
    });
  }

  private async exchangeCodeForToken(code: string) {
    try {
      const response: AxiosResponse<TokenResponse> =
        await this.tokenClient.post('', null, {
          params: AUTH.GITHUB.getTokenExchangeParams(code),
        });
      return response.data.access_token;
    } catch (error) {
      throw ApiError.githubAuthFailed(
        'Failed to exchange GitHub code for token.',
        error,
      );
    }
  }

  private async fetchUserProfile(token: string) {
    try {
      const response: AxiosResponse<UserResponse> = await this.apiClient.get(
        '/user',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw ApiError.githubAuthFailed(
        'Failed to fetch GitHub user profile.',
        error,
      );
    }
  }

  private async fetchUserEmails(token: string) {
    try {
      const response: AxiosResponse<EmailResponse[]> = await this.apiClient.get(
        'user/emails',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw ApiError.githubAuthFailed(
        'Failed to fetch GitHub user emails.',
        error,
      );
    }
  }

  private async mapGithubProfile(
    rawProfile: UserResponse,
    token: string,
  ): Promise<OAuthUserProfile> {
    let email = rawProfile.email;

    if (!email) {
      const emails = await this.fetchUserEmails(token);
      const primaryVerifiedEmail = emails.find(
        email => email.primary && email.verified,
      );
      email = primaryVerifiedEmail ? primaryVerifiedEmail.email : null;
    }

    return {
      email: email,
      name: rawProfile.login,
      picture: rawProfile.avatar_url,
      provider: 'GITHUB',
      providerAccountId: rawProfile.id.toString(),
    };
  }

  async authenticate(code: string) {
    const token = await this.exchangeCodeForToken(code);
    const rawProfile = await this.fetchUserProfile(token);
    const unifiedProfile = await this.mapGithubProfile(rawProfile, token);

    return unifiedProfile;
  }
}
