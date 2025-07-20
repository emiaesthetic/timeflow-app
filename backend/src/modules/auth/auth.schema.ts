import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().nullable(),
  name: z.string(),
  picture: z.string(),
});

export const RegisterSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const RegisterWithOAuthSchema = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
  email: z.string().min(1, 'Email is required').email().nullable(),
  name: z.string().min(1, 'Name is required'),
  picture: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export const GithubOAuthSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

export const GithubTokenResponseSchema = z.object({
  access_token: z.string(),
});

export const GithubUserResponseSchema = z.object({
  id: z.number(),
  email: z.string().nullable(),
  login: z.string(),
  avatar_url: z.string(),
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;
export type RegisterWithOAuthPayload = z.infer<typeof RegisterWithOAuthSchema>;
export type LoginPayload = z.infer<typeof LoginSchema>;

export type GithubOAuthPayload = z.infer<typeof GithubOAuthSchema>;
export type GithubTokenResponse = z.infer<typeof GithubTokenResponseSchema>;
export type GithubUserResponse = z.infer<typeof GithubUserResponseSchema>;
