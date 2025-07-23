import { z } from 'zod';

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
  email: z.string().nullable(),
  name: z.string(),
  picture: z.string(),
});

export const OAuthSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

export const TokenResponseSchema = z.object({
  access_token: z.string(),
});

export const GithubUserResponseSchema = z.object({
  id: z.number(),
  email: z.string().nullable(),
  login: z.string(),
  avatar_url: z.string(),
});

export const GoogleUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  picture: z.string(),
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;
export type RegisterWithOAuthPayload = z.infer<typeof RegisterWithOAuthSchema>;
export type LoginPayload = z.infer<typeof LoginSchema>;

export type OAuthPayload = z.infer<typeof OAuthSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type GithubUserResponse = z.infer<typeof GithubUserResponseSchema>;
export type GoogleUserResponse = z.infer<typeof GoogleUserResponseSchema>;
