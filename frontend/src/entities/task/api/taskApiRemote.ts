import { AxiosResponse } from 'axios';

import { axiosWithAuth } from '@/shared/api';
import { API } from '@/shared/config';

import { mapTaskResponse } from '../lib/mapTaskResponse';
import { Task, TaskId, TaskResponse, TasksApi } from '../model/types';

export const tasksApiRemote: TasksApi = {
  fetchTasks: async function () {
    const response: AxiosResponse<TaskResponse[]> = await axiosWithAuth.get(
      `${API.tasks()}`,
    );

    return response.data.map(task => mapTaskResponse(task));
  },

  createTask: async function (payload: Omit<Task, 'id'>) {
    await axiosWithAuth.post(`${API.tasks()}`, payload);
  },

  updateTask: async function (taskId: TaskId, payload: Partial<Task>) {
    await axiosWithAuth.put(`${API.tasks(taskId)}`, payload);
  },

  deleteTask: async function (taskId: TaskId) {
    await axiosWithAuth.delete(`${API.tasks(taskId)}`);
  },
};
