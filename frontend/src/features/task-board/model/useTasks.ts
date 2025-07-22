import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getAxiosErrorMessage } from '@/shared/lib/getAxiosErrorMessage';

import { useTasksApi } from './TasksApiContext';
import { Task, TaskFormData } from './types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const api = useTasksApi();

  const refetch = useCallback(async () => {
    try {
      const fetchedTasks = await api.fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    }
  }, [api]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createTask = async (formData: TaskFormData) => {
    try {
      await api.createTask(formData);
      refetch();
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    }
  };

  const updateTask = async (taskId: string, formData: TaskFormData) => {
    try {
      await api.updateTask(taskId, formData);
      refetch();
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.deleteTask(taskId);
      refetch();
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    }
  };

  return { tasks, refetch, createTask, updateTask, deleteTask };
}
