import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid e-mail address'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Min length 6 characters'),
});

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid e-mail address'),
  password: z.string().min(6, 'Min length 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;

export type User = {
  email: string;
  name: string;
  picture: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
