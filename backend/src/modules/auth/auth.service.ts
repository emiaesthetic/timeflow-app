import { hash, verify } from 'argon2';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { CONFIG } from '@/common/config';
import { ApiError } from '@/common/errors/apiError';

import { UserService } from '../users/users.service';

import {
  GithubTokenResponse,
  GithubUserResponse,
  LoginPayload,
  RegisterPayload,
} from './auth.schema';

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(payload: RegisterPayload) {
    const newUser = await this.userService.createUser({
      ...payload,
      password: await hash(payload.password),
    });

    return newUser;
  }

  async login(payload: LoginPayload) {
    try {
      const user = await this.userService.getUserByEmail(payload.email);

      if (!user) {
        throw ApiError.notFound('User not found');
      }

      const isPasswordValid = await verify(user.password, payload.password);

      if (!isPasswordValid) {
        throw ApiError.unauthorized('Invalid credentials');
      }

      return user;
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        throw ApiError.unauthorized('Invalid credentials');
      }

      throw error;
    }
  }

  async registerWithGithub(code: string) {
    try {
      const tokenResponse: AxiosResponse<GithubTokenResponse> =
        await axios.post(CONFIG.GITHUB_AUTH_TOKEN, null, {
          headers: {
            Accept: 'application/json',
          },
          params: {
            client_id: CONFIG.GITHUB_CLIENT_ID,
            client_secret: CONFIG.GITHUB_CLIENT_SECRET,
            code,
          },
        });

      const token = tokenResponse.data.access_token;

      const userResponse: AxiosResponse<GithubUserResponse> = await axios.get(
        CONFIG.GITHUB_API_USER,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userProfile = userResponse.data;

      let user = await this.userService.getUserByProvider({
        provider: 'github',
        providerAccountId: userProfile.id.toString(),
      });

      if (!user) {
        user = await this.userService.createUser({
          provider: 'github',
          providerAccountId: userProfile.id.toString(),
          email: userProfile.email,
          name: userProfile.login,
          picture: userProfile.avatar_url,
        });
      }

      return user;
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.message
          : 'GitHub token exchange failed';
      throw ApiError.unauthorized(message);
    }
  }
}
