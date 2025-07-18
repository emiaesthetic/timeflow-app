import { hash, verify } from 'argon2';

import { ApiError } from '@/common/errors/apiError';

import { UserService } from '../users/users.service';

import { LoginPayload, RegisterPayload } from './auth.schema';

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
}
