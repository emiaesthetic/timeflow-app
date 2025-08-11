import { createId } from '@paralleldrive/cuid2';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { CONFIG } from '@/shared/config';

import { tasksApiRemote } from '../api/taskApiRemote';
import { tasksApiStorage } from '../api/taskApiStorage';
import { transformFormDataToPayload } from '../lib/transformTask';

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
          await tasksApiRemote.createTask(task);
        }

        localStorage.removeItem(CONFIG.STORAGE_KEYS.TASKS);
        await refetch();
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    };

    if (isAuthenticated) {
      migrateTasks();
    } else {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  const createTask = async (formData: TaskFormData) => {
    const payload = transformFormDataToPayload(formData);

    const optimisticId = createId();
    const optimisticTask = {
      id: optimisticId,
      ...payload,
    };
    setTasks(lastState => [...lastState, optimisticTask]);

    try {
      await api.createTask(payload);
      refetch();
    } catch (error) {
      setTasks(lastState => lastState.filter(task => task.id !== optimisticId));
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const updateTask = async (taskId: string, formData: TaskFormData) => {
    const payload = transformFormDataToPayload(formData);

    const prevTasks = [...tasks];
    setTasks(lastState =>
      lastState.map(task => (task.id === taskId ? { ...task, payload } : task)),
    );

    try {
      await api.updateTask(taskId, payload);
      refetch();
    } catch (error) {
      setTasks(prevTasks);
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const deleteTask = async (taskId: string) => {
    const prevTasks = [...tasks];
    setTasks(lastState => lastState.filter(task => task.id !== taskId));

    try {
      await api.deleteTask(taskId);
      refetch();
    } catch (error) {
      setTasks(prevTasks);
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  return { tasks, refetch, createTask, updateTask, deleteTask };
}
