import { z } from 'zod';

export const userResponseSchema = z.object({
  email: z.string(),
  picture: z.string(),
  name: z.string().optional(),
});

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const registerResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema,
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
