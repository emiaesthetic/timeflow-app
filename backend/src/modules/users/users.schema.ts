import { z } from 'zod';

export const updateUserSchema = z.object({
  email: z.string().optional(),
  picture: z.string().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
});

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  picture: z.string(),
  name: z.string(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
