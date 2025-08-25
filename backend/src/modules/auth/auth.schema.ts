import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const OAuthCodeSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

export const OAuthUserProfileSchema = z.object({
  provider: z.enum(['GITHUB', 'GOOGLE']),
  providerAccountId: z.string(),
  email: z.string().min(1, 'Email is required').email().nullable(),
  name: z.string().min(1, 'Name is required'),
  picture: z.string().optional(),
});

export const PublicUserSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  name: z.string(),
  picture: z.string(),
  provider: z.enum(['EMAIL_PASSWORD', 'GITHUB', 'GOOGLE']),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: PublicUserSchema,
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;
export type LoginPayload = z.infer<typeof LoginSchema>;

export type OAuthUserProfile = z.infer<typeof OAuthUserProfileSchema>;
export type OAuthCodePayload = z.infer<typeof OAuthCodeSchema>;

export type PublicUser = z.infer<typeof PublicUserSchema>;
