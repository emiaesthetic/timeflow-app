import { AxiosResponse } from 'axios';

import { axiosWithAuth } from '@/shared/api';
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
    const response: AxiosResponse<TaskResponse[]> = await axiosWithAuth.get(
      `${API.tasks()}`,
    );

    return response.data.map(task => transformResponseToTask(task));
  },

  createTask: async function (formData: TaskFormData) {
    const payload: TaskPayload = transformFormDateToPayload(formData);
    await axiosWithAuth.post(`${API.tasks()}`, payload);
  },

  updateTask: async function (taskId: string, formData: TaskFormData) {
    const payload: TaskPayload = transformFormDateToPayload(formData);
    await axiosWithAuth.put(`${API.tasks(taskId)}`, payload);
  },

  deleteTask: async function (taskId: string) {
    await axiosWithAuth.delete(`${API.tasks(taskId)}`);
  },
};
