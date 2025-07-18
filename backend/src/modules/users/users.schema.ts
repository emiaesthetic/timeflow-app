import { z } from 'zod';

export const updateUserSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  picture: z.string().optional(),
});

export const userResponseSchema = z.object({
  email: z.string(),
  name: z.string(),
  picture: z.string(),
});

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
