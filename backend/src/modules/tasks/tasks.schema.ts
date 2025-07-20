import { z } from 'zod';

export const TaskParamsSchema = z.object({
  id: z.string(),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().transform(val => new Date(val)),
  duration: z.number().min(1).max(1440),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['PROCESS', 'DONE']),
});

export const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z
    .string()
    .transform(val => new Date(val))
    .optional(),
  duration: z.number().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  status: z.enum(['PROCESS', 'DONE']).optional(),
});

export const TaskResponseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  duration: z.number(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['PROCESS', 'DONE']),
  userId: z.string(),
});

export type CreateTaskPayload = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskPayload = z.infer<typeof UpdateTaskSchema>;
export type TaskParams = z.infer<typeof TaskParamsSchema>;
