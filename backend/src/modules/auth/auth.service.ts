import { hash, verify } from 'argon2';

import { ApiError } from '@/common/errors/apiError';

import { UserService } from '../users/users.service';

import { LoginDto, RegisterDto } from './auth.schema';

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(dto: RegisterDto) {
    const newUser = await this.userService.createUser({
      email: dto.email,
      password: await hash(dto.password),
    });

    return newUser;
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userService.getUserByEmail(dto.email);
      const isPasswordValid = await verify(user.password, dto.password);

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
