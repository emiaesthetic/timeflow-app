import { hash, verify } from 'argon2';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { AUTH } from '@/common/config';
import { ApiError } from '@/common/errors/apiError';

import { UserService } from '../users/users.service';

import { AuthRepository } from './auth.repository';
import {
  GithubUserResponse,
  GoogleUserResponse,
  LoginPayload,
  RefreshTokenPayload,
  RegisterPayload,
  TokenResponse,
} from './auth.schema';

export class AuthService {
  private authRepository: AuthRepository;
  private userService: UserService;

  constructor(authRepository: AuthRepository, userService: UserService) {
    this.authRepository = authRepository;
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
    const user = await this.userService.getUserByEmail(payload.email);

    if (!user) {
      throw ApiError.unauthorized('Invalid credentials');
    }

    const isPasswordValid = await verify(user.password, payload.password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid credentials');
    }

    return user;
  }

  async loginWithGithub(code: string) {
    try {
      const tokenResponse: AxiosResponse<TokenResponse> = await axios.post(
        AUTH.GITHUB.TOKEN_URL,
        null,
        {
          headers: {
            Accept: 'application/json',
          },
          params: {
            client_id: AUTH.GITHUB.CLIENT_ID,
            client_secret: AUTH.GITHUB.CLIENT_SECRET,
            redirect_uri: AUTH.REDIRECT_URI,
            code,
          },
        },
      );

      const token = tokenResponse.data.access_token;

      const userResponse: AxiosResponse<GithubUserResponse> = await axios.get(
        AUTH.GITHUB.USER_API,
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
        error instanceof AxiosError ? error.message : 'GitHub auth error';
      throw ApiError.unauthorized(message);
    }
  }

  async loginWithGoogle(code: string) {
    try {
      const tokenResponse: AxiosResponse<TokenResponse> = await axios.post(
        AUTH.GOOGLE.TOKEN_URL,
        null,
        {
          headers: {
            Accept: 'application/json',
          },
          params: {
            client_id: AUTH.GOOGLE.CLIENT_ID,
            client_secret: AUTH.GOOGLE.CLIENT_SECRET,
            redirect_uri: AUTH.REDIRECT_URI,
            grant_type: 'authorization_code',
            code,
          },
        },
      );

      const token = tokenResponse.data.access_token;

      const userResponse: AxiosResponse<GoogleUserResponse> = await axios.get(
        AUTH.GOOGLE.USER_API,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userProfile = userResponse.data;

      let user = await this.userService.getUserByProvider({
        provider: 'google',
        providerAccountId: userProfile.id.toString(),
      });

      if (!user) {
        user = await this.userService.createUser({
          provider: 'google',
          providerAccountId: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          picture: userProfile.picture,
        });
      }

      return user;
    } catch (error) {
      const message =
        error instanceof AxiosError ? error.message : 'Google auth error';
      throw ApiError.unauthorized(message);
    }
  }

  async upsertRefreshToken(payload: Omit<RefreshTokenPayload, 'expiryDate'>) {
    const oldRefreshToken = await this.authRepository.findByUserId(
      payload.userId,
    );

    const newRefreshToken = {
      token: payload.token,
      userId: payload.userId,
      issuedAt: new Date(),
      expiryDate: this.computeExpiryDate(),
    };

    if (oldRefreshToken) {
      this.authRepository.update(newRefreshToken);
    } else {
      this.authRepository.create(newRefreshToken);
    }
  }

  computeExpiryDate() {
    const now = new Date();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    return new Date(now.getTime() + sevenDaysInMs);
  }
}
