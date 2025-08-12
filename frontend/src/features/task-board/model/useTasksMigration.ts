import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { CONFIG } from '@/shared/config';
import { queryKeys } from '@/shared/constants';

import { tasksApiRemote } from '../api/taskApiRemote';
import { tasksApiStorage } from '../api/taskApiStorage';

import { useTasksApi } from './TasksApiContext';

export function useTasksMigration() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useTasksApi();
  const isMigration = useRef(false);

  const migrateTasks = useCallback(async () => {
    if (isMigration.current) return;

    isMigration.current = true;

    try {
      const localStorageTasks = await tasksApiStorage.fetchTasks();

      for (const task of localStorageTasks) {
        await tasksApiRemote.createTask(task);
      }

      localStorage.removeItem(CONFIG.STORAGE_KEYS.TASKS);
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks(isAuthenticated),
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [queryClient, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      migrateTasks();
    }
  }, [isAuthenticated, migrateTasks]);
}
