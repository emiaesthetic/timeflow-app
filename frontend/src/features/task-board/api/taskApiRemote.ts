import { AxiosResponse } from 'axios';

import { authenticatedHttpClient } from '@/shared/api/httpClient';
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
    if (!authenticatedHttpClient) {
      throw new Error('HTTP client not initialized.');
    }

    const response: AxiosResponse<TaskResponse[]> =
      await authenticatedHttpClient.get(`${API.tasks()}`);

    return response.data.map(task => transformResponseToTask(task));
  },

  createTask: async function (formData: TaskFormData) {
    if (!authenticatedHttpClient) {
      throw new Error('HTTP client not initialized.');
    }

    const payload: TaskPayload = transformFormDateToPayload(formData);
    await authenticatedHttpClient.post(`${API.tasks()}`, payload);
  },

  updateTask: async function (taskId: string, formData: TaskFormData) {
    if (!authenticatedHttpClient) {
      throw new Error('HTTP client not initialized.');
    }

    const payload: TaskPayload = transformFormDateToPayload(formData);
    await authenticatedHttpClient.put(`${API.tasks(taskId)}`, payload);
  },

  deleteTask: async function (taskId: string) {
    if (!authenticatedHttpClient) {
      throw new Error('HTTP client not initialized.');
    }

    await authenticatedHttpClient.delete(`${API.tasks(taskId)}`);
  },
};
