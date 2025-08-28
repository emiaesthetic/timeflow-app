import { z } from 'zod';

export const TaskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  duration: z
    .string()
    .refine(value => !Number.isNaN(value), 'Duration must be a number')
    .refine(value => Number(value) > 0, 'Value must be greater than 0'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['PROCESS', 'DONE']),
});

export type TaskFormData = z.infer<typeof TaskFormSchema>;
