import { createId } from '@paralleldrive/cuid2';

import {
  transformFormDateToPayload,
  transformResponseToTask,
} from '../lib/transformTask';
import {
  Task,
  TaskFormData,
  TaskPayload,
  TaskResponse,
  TasksApi,
} from '../model/types';

export const STORAGE_KEY = 'timeflow-tasks';

export const tasksApiStorage: TasksApi = {
  fetchTasks: async function () {
    const tasks = localStorage.getItem(STORAGE_KEY);
    if (!tasks) return [];

    return JSON.parse(tasks).map((task: TaskResponse) =>
      transformResponseToTask(task),
    );
  },

  createTask: async function (formData: TaskFormData) {
    const payload: TaskPayload = transformFormDateToPayload(formData);

    const newTask: Task = {
      id: createId(),
      ...payload,
    };

    const tasks = await this.fetchTasks();
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  },

  updateTask: async function (taskId: string, formData: TaskFormData) {
    const payload: TaskPayload = transformFormDateToPayload(formData);

    const tasks = await this.fetchTasks();
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...payload };
      }
      return task;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  },

  deleteTask: async function (taskId: string) {
    const tasks = await this.fetchTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
  },
};
