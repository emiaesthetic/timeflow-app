import { User } from '@prisma/client';

import { ApiError } from '@/common/errors/apiError';

import { CreateUserDto } from './user.schema';
import { UserRepository } from '@/prisma/repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw ApiError.badRequest('User with this email already exists', [
        'Email already taken',
      ]);
    }

    return this.userRepository.create(data);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }
}
