import { createId } from '@paralleldrive/cuid2';

import { CONFIG } from '@/shared/config';

import { mapTaskResponse } from '../lib/mapTaskResponse';
import { Task, TaskId, TaskResponse, TasksApi } from '../model/types';

export const tasksApiStorage: TasksApi = {
  fetchTasks: async function () {
    const tasks = localStorage.getItem(CONFIG.STORAGE_KEYS.TASKS);
    if (!tasks) return [];

    return JSON.parse(tasks).map((task: TaskResponse) => mapTaskResponse(task));
  },

  createTask: async function (payload: Omit<Task, 'id'>) {
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

  updateTask: async function (taskId: TaskId, payload: Partial<Task>) {
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

  deleteTask: async function (taskId: TaskId) {
    const tasks = await this.fetchTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);

    localStorage.setItem(
      CONFIG.STORAGE_KEYS.TASKS,
      JSON.stringify(filteredTasks),
    );
  },
};
