import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email().nullable(),
  name: z.string().min(1, 'Name is required'),
  password: z.string().optional(),
  picture: z.string().optional(),
  provider: z.enum(['EMAIL_PASSWORD', 'GITHUB', 'GOOGLE']),
  providerAccountId: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  picture: z.string().optional(),
  provider: z.enum(['EMAIL_PASSWORD', 'GITHUB', 'GOOGLE']).optional(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  name: z.string(),
  picture: z.string(),
  provider: z.enum(['EMAIL_PASSWORD', 'GITHUB', 'GOOGLE']),
});

export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
export type PublicUser = z.infer<typeof UserResponseSchema>;
