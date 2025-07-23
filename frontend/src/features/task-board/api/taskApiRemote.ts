import { AxiosResponse } from 'axios';

import { client } from '@/shared/api';
import { API } from '@/shared/config';

import {
  transformFormDateToPayload,
  transformResponseToTask,
} from '../lib/transformTask';
import {
  TaskFormData,
  TaskPayload,
  TaskResponse,
  TasksApi,
} from '../model/types';

export const tasksApiRemote: TasksApi = {
  fetchTasks: async function () {
    const response: AxiosResponse<TaskResponse[]> = await client.get(
      `${API.tasks()}`,
    );

    return response.data.map(task => transformResponseToTask(task));
  },

  createTask: async function (formData: TaskFormData) {
    const payload: TaskPayload = transformFormDateToPayload(formData);
    await client.post(`${API.tasks()}`, payload);
  },

  updateTask: async function (taskId: string, formData: TaskFormData) {
    const payload: TaskPayload = transformFormDateToPayload(formData);
    await client.put(`${API.tasks(taskId)}`, payload);
  },

  deleteTask: async function (taskId: string) {
    await client.delete(`${API.tasks(taskId)}`);
  },
};
