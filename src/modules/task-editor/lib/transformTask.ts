import { Task, TaskFormData } from '@/shared/types/task';

export const transformTaskToFormDate = (task: Task): TaskFormData => {
  return {
    title: task.title,
    description: task.description,
    date: task.date,
    time: task.time,
    duration: (task.duration / 60_000).toString(),
    priority: task.priority,
  };
};

export const transformFormDateToTask = (
  formData: TaskFormData,
): Omit<Task, 'id'> => {
  return {
    ...formData,
    duration: Number(formData.duration) * 60_000,
  };
};
