import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  picture: z.string().optional(),
});

export const UserResponseSchema = z.object({
  email: z.string().nullable(),
  name: z.string(),
  picture: z.string(),
});

export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
