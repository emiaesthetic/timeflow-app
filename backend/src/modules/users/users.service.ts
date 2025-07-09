import { User } from '@prisma/client';

import { ApiError } from '@/common/errors/apiError';

import { RegisterDto } from '../auth/auth.schema';

import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './users.schema';

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

  async createUser(dto: RegisterDto): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      throw ApiError.badRequest('User with this email already exists', [
        'Email already taken',
      ]);
    }

    return await this.usersRepository.create(dto);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    return await this.usersRepository.update(id, dto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.usersRepository.delete(id);
  }
}
