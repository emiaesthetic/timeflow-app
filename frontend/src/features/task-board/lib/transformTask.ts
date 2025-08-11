import { Task, TaskFormData, TaskResponse } from '../model/types';

import { dateApi } from './dateApi';

export function transformTaskToFormData(task: Task): TaskFormData {
  return {
    ...task,
    time: dateApi.formatTimeForInput(task.date),
    duration: (task.duration / 60_000).toString(),
  };
}

export function transformFormDataToPayload(
  formData: TaskFormData,
): Omit<Task, 'id'> {
  return {
    ...formData,
    date: dateApi.getLocalDate(formData.date, formData.time),
    duration: Number(formData.duration) * 60_000,
  };
}

export function transformResponseToTask(item: TaskResponse): Task {
  return {
    ...item,
    date: new Date(item.date),
  };
}
