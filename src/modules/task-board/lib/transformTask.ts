import { ITask, ITaskFormData } from '../types';

export const transformTaskToFormDate = (task: ITask): ITaskFormData => {
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
  formData: ITaskFormData,
): Omit<ITask, 'id'> => {
  return {
    ...formData,
    duration: Number(formData.duration) * 60_000,
  };
};
