import { User } from '@prisma/client';
import { hash, verify } from 'argon2';

import { ApiError } from '@/common/errors/apiError';

import { UserService } from '../users/users.service';

import { LoginPayload, OAuthUserProfile, RegisterPayload } from './auth.schema';
import { GithubOAuthService } from './github.service';
import { GoogleOAuthService } from './google.service';

export class AuthService {
  private readonly userService: UserService;
  private readonly githubOAuthService: GithubOAuthService;
  private readonly googleOAuthService: GoogleOAuthService;

  constructor({
    userService,
    githubOAuthService,
    googleOAuthService,
  }: {
    userService: UserService;
    githubOAuthService: GithubOAuthService;
    googleOAuthService: GoogleOAuthService;
  }) {
    this.userService = userService;
    this.githubOAuthService = githubOAuthService;
    this.googleOAuthService = googleOAuthService;
  }

  async registerWithEmailPassword(payload: RegisterPayload) {
    const existingUser = await this.userService.getUserByEmail(payload.email);

    if (existingUser) {
      switch (existingUser.provider) {
        case 'GITHUB':
          throw ApiError.badRequest(
            'User with this email already registered via GitHub.',
          );
        case 'GOOGLE':
          throw ApiError.badRequest(
            'User with this email already registered via Google.',
          );
        default:
          throw ApiError.conflict('User with this email already exists.');
      }
    }

    const newUser = await this.userService.createUser({
      ...payload,
      provider: 'EMAIL_PASSWORD',
      password: await hash(payload.password),
    });

    return newUser;
  }

  async loginWithEmailPassword(payload: LoginPayload) {
    const user = await this.userService.getUserByEmail(payload.email);

    if (!user) {
      throw ApiError.invalidCredentials();
    }

    if (user.provider === 'GITHUB' || user.provider === 'GOOGLE') {
      throw ApiError.badRequest(
        `This email address is registered via ${user.provider}. Please use the "Login with ${user.provider}" button.`,
      );
    }

    const isPasswordValid = await verify(user.password, payload.password);

    if (!isPasswordValid) {
      throw ApiError.invalidCredentials();
    }

    return user;
  }

  async loginWithOAuth(provider: User['provider'], code: string) {
    let unifiedProfile: OAuthUserProfile;

    switch (provider) {
      case 'GITHUB':
        unifiedProfile = await this.githubOAuthService.authenticate(code);
        break;
      case 'GOOGLE':
        unifiedProfile = await this.googleOAuthService.authenticate(code);
        break;
      default:
        throw ApiError.badRequest('Unsupported OAuth provider');
    }

    return this.findOrCreateOAuthUser(unifiedProfile);
  }

  async findOrCreateOAuthUser(unifiedProfile: OAuthUserProfile): Promise<User> {
    let user = await this.userService.getUserByProvider({
      provider: unifiedProfile.provider,
      providerAccountId: unifiedProfile.providerAccountId,
    });

    if (user) return user;

    if (unifiedProfile.email) {
      user = await this.userService.getUserByEmail(unifiedProfile.email);

      if (user) {
        if (
          user.picture === '/uploads/no-user-image.svg' &&
          unifiedProfile.picture
        ) {
          user = await this.userService.updateUser(user.id, {
            picture: unifiedProfile.picture,
            provider: unifiedProfile.provider,
          });
        }

        return user;
      }
    }

    user = await this.userService.createUser(unifiedProfile);
    return user;
  }
}
