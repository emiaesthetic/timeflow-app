import { User } from '@prisma/client';

import { ApiError } from '@/common/errors/apiError';

import { UsersRepository } from './users.repository';
import { CreateUserPayload, UpdateUserPayload } from './users.schema';

export class UserService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(payload.email);

    if (existingUser) {
      throw ApiError.conflict('User with this email already exists');
    }

    return await this.usersRepository.create(payload);
  }

  async updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw ApiError.notFound('User not found');
    }

    return await this.usersRepository.update(id, payload);
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw ApiError.notFound('User not found');
    }

    await this.usersRepository.delete(id);
  }

  async getCurrentUser(id: string): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async getUserByProvider({
    provider,
    providerAccountId,
  }: {
    provider: User['provider'];
    providerAccountId: string;
  }): Promise<User | null> {
    return this.usersRepository.findByProvider(provider, providerAccountId);
  }
}
