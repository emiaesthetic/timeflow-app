import { z } from 'zod';

export type Task = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  duration: number;
  priority: 'low' | 'medium' | 'high';
};

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  duration: z
    .string()
    .refine(value => !Number.isNaN(value), 'Duration must be a number')
    .refine(value => Number(value) > 0, 'Value must be greater than 0'),
  priority: z.enum(['low', 'medium', 'high']),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

export type TaskStorageItem = {
  id: string;
  title: string;
  description?: string;
  date: string;
  duration: number;
  priority: 'low' | 'medium' | 'high';
};
