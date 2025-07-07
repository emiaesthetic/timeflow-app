import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export const getUserParamsSchema = z.object({
  id: z.string(),
});

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  picture: z.string(),
  name: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const loginResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type GetUserParams = z.infer<typeof getUserParamsSchema>;
