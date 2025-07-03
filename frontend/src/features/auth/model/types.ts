import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid e-mail address'),
  password: z.string().min(6, 'Min length 6 characters'),
});

export type AuthFormData = z.infer<typeof authFormSchema>;
