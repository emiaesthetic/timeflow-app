import { Task } from '@/entities/task';

import { TaskFormData } from '../model/types';

import { dateApi } from './dateApi';

export function mapTaskToFormData(task: Task): TaskFormData {
  return {
    ...task,
    time: dateApi.formatTimeForInput(task.date),
    duration: (task.duration / 60_000).toString(),
  };
}

export function mapFormDataToPayload(formData: TaskFormData): Omit<Task, 'id'> {
  return {
    ...formData,
    date: dateApi.getLocalDate(formData.date, formData.time),
    duration: Number(formData.duration) * 60_000,
  };
}
