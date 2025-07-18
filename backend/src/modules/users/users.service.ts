import { User } from '@prisma/client';

import { ApiError } from '@/common/errors/apiError';

import { RegisterPayload } from '../auth/auth.schema';

import { UsersRepository } from './users.repository';
import { UpdateUserPayload } from './users.schema';

export class UserService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }

  async createUser(payload: RegisterPayload): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(payload.email);

    if (existingUser) {
      throw ApiError.badRequest('User with this email already exists', [
        'Email already taken',
      ]);
    }

    return await this.usersRepository.create(payload);
  }

  async updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
    await this.getUserById(id);
    return await this.usersRepository.update(id, payload);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.usersRepository.delete(id);
  }
}
