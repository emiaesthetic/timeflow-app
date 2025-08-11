import { AxiosResponse } from 'axios';

import { axiosWithAuth } from '@/shared/api';
import { API } from '@/shared/config';

import { transformResponseToTask } from '../lib/transformTask';
import { TaskPayload, TaskResponse, TasksApi } from '../model/types';

export const tasksApiRemote: TasksApi = {
  fetchTasks: async function () {
    const response: AxiosResponse<TaskResponse[]> = await axiosWithAuth.get(
      `${API.tasks()}`,
    );

    return response.data.map(task => transformResponseToTask(task));
  },

  createTask: async function (payload: TaskPayload) {
    await axiosWithAuth.post(`${API.tasks()}`, payload);
  },

  updateTask: async function (taskId: string, payload: TaskPayload) {
    await axiosWithAuth.put(`${API.tasks(taskId)}`, payload);
  },

  deleteTask: async function (taskId: string) {
    await axiosWithAuth.delete(`${API.tasks(taskId)}`);
  },
};
