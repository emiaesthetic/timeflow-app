import { z } from 'zod';

export type TaskId = string;

export type PRIORITY = 'LOW' | 'MEDIUM' | 'HIGH';

export type STATUS = 'PROCESS' | 'DONE';

export type TaskPayload = {
  title: string;
  description?: string;
  date: Date;
  duration: number;
  priority: PRIORITY;
  status: STATUS;
};

export type Task = {
  id: TaskId;
} & TaskPayload;

export type TaskResponse = {
  id: string;
  title: string;
  description?: string;
  date: string;
  duration: number;
  priority: PRIORITY;
  status: STATUS;
};

export type TasksApi = {
  fetchTasks: () => Promise<Task[]>;
  createTask: (formData: TaskFormData) => Promise<void>;
  updateTask: (taskId: string, formData: TaskFormData) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
};

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
