import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { CONFIG } from '@/shared/config';

import { tasksApiRemote } from '../api/taskApiRemote';
import { tasksApiStorage } from '../api/taskApiStorage';
import { transformTaskToFormDate } from '../lib/transformTask';

import { useTasksApi } from './TasksApiContext';
import { Task, TaskFormData } from './types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isAuthenticated, api } = useTasksApi();

  const isMigrated = useRef(false);

  const refetch = useCallback(async () => {
    try {
      const fetchedTasks = await api.fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  }, [api]);

  useEffect(() => {
    const migrateTasks = async () => {
      if (isMigrated.current) return;

      isMigrated.current = true;

      try {
        const localTasks = await tasksApiStorage.fetchTasks();

        for (const task of localTasks) {
          const formData = transformTaskToFormDate(task);
          await tasksApiRemote.createTask(formData);
          localStorage.removeItem(CONFIG.STORAGE_KEYS.TASKS);
        }
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    };

    if (isAuthenticated) {
      migrateTasks();
    }

    refetch();
  }, [isAuthenticated, refetch]);

  const createTask = async (formData: TaskFormData) => {
    try {
      await api.createTask(formData);
      refetch();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const updateTask = async (taskId: string, formData: TaskFormData) => {
    try {
      await api.updateTask(taskId, formData);
      refetch();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.deleteTask(taskId);
      refetch();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return { tasks, refetch, createTask, updateTask, deleteTask };
}
