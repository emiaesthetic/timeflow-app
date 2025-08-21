import { MultipartFields, MultipartFile } from '@fastify/multipart';
import { createId } from '@paralleldrive/cuid2';
import { PrismaClient, User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as path from 'path';

import { ApiError } from '@/common/errors/apiError';

import * as fs from 'fs/promises';

import { UsersRepository } from './users.repository';
import { UpdateUserPayload, UpdateUserSchema } from './users.schema';
import { UserService } from './users.service';

export class UsersController {
  private userService: UserService;

  constructor(prisma: PrismaClient) {
    const usersRepository = new UsersRepository(prisma);
    this.userService = new UserService(usersRepository);
  }

  async getCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.getCurrentUser(request.user.id);
    reply.status(200).send(this.toPublicUser(user));
  }

  async updateCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const data = await request.file();
    let payloadToUpdate: UpdateUserPayload = {};

    if (data && data.fields) {
      const textFields = this.extractTextFields(data.fields);

      try {
        const parsedFields = UpdateUserSchema.parse(textFields);
        payloadToUpdate = { ...payloadToUpdate, ...parsedFields };
      } catch {
        throw ApiError.badRequest('Invalid fields in request body');
      }
    }

    if (data) {
      payloadToUpdate.picture = await this.processAvatarUpload(data);
    }

    const updatedUser = await this.userService.updateUser(
      request.user.id,
      payloadToUpdate,
    );

    reply.status(200).send(this.toPublicUser(updatedUser));
  }

  async deleteCurrentUserHandler(request: FastifyRequest, reply: FastifyReply) {
    await this.userService.deleteUser(request.user.id);
    reply.status(204).send(null);
  }

  private toPublicUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    };
  }

  private extractTextFields(fields: MultipartFields) {
    const textFields: Record<string, string> = {};

    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const field = fields[key];
        if (field && typeof field === 'object' && 'value' in field) {
          textFields[key] = String(field.value);
        }
      }
    }

    return textFields;
  }

  private async processAvatarUpload(data: MultipartFile) {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(data.mimetype)) {
      throw ApiError.badRequest('Invalid file type for picture.');
    }
    if (data.fieldname !== 'picture') {
      throw ApiError.badRequest('File field name must be "picture"');
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExtension = path.extname(data.filename);
    const uniqueFilename = `${createId()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    const avatarUrl = `/uploads/${uniqueFilename}`;

    await fs.writeFile(filePath, await data.toBuffer());

    return avatarUrl;
  }
}
