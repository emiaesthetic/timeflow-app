import { z } from 'zod';

export const userResponseSchema = z.object({
  email: z.string(),
  name: z.string(),
  picture: z.string(),
});

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  name: z.string().min(1, 'Name is required'),
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

export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
