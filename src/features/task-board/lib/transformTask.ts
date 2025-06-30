import { Task, TaskFormData, TaskStorageItem } from '../model/types';

import { dateApi } from './dateApi';

export function transformTaskToFormDate(task: Task): TaskFormData {
  return {
    ...task,
    time: dateApi.formatTimeForInput(task.date),
    duration: (task.duration / 60_000).toString(),
  };
}

export function transformFormDateToTask(
  formData: TaskFormData,
): Omit<Task, 'id'> {
  return {
    title: formData.title,
    description: formData.description,
    date: dateApi.getLocalDate(formData.date, formData.time),
    duration: Number(formData.duration) * 60_000,
    priority: formData.priority,
  };
}

export function transformStorageItemToTask(item: TaskStorageItem): Task {
  return {
    ...item,
    date: new Date(item.date),
  };
}
