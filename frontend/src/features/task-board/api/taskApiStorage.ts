import { createId } from '@paralleldrive/cuid2';

import { CONFIG } from '@/shared/config';

import { transformResponseToTask } from '../lib/transformTask';
import { Task, TaskPayload, TaskResponse, TasksApi } from '../model/types';

export const tasksApiStorage: TasksApi = {
  fetchTasks: async function () {
    const tasks = localStorage.getItem(CONFIG.STORAGE_KEYS.TASKS);
    if (!tasks) return [];

    return JSON.parse(tasks).map((task: TaskResponse) =>
      transformResponseToTask(task),
    );
  },

  createTask: async function (payload: TaskPayload) {
    const newTask: Task = {
      id: createId(),
      ...payload,
    };

    const tasks = await this.fetchTasks();
    const updatedTasks = [...tasks, newTask];

    localStorage.setItem(
      CONFIG.STORAGE_KEYS.TASKS,
      JSON.stringify(updatedTasks),
    );
  },

  updateTask: async function (taskId: string, payload: TaskPayload) {
    const tasks = await this.fetchTasks();
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...payload };
      }
      return task;
    });

    localStorage.setItem(
      CONFIG.STORAGE_KEYS.TASKS,
      JSON.stringify(updatedTasks),
    );
  },

  deleteTask: async function (taskId: string) {
    const tasks = await this.fetchTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);

    localStorage.setItem(
      CONFIG.STORAGE_KEYS.TASKS,
      JSON.stringify(filteredTasks),
    );
  },
};
