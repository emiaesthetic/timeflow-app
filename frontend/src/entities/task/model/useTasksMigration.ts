import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { CONFIG } from '@/shared/config';
import { queryKeys } from '@/shared/constants';

import { tasksApiRemote } from '../api/taskApiRemote';
import { tasksApiStorage } from '../api/taskApiStorage';

import { useTasksApi } from './TasksApiContext';

export function useTasksMigration() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useTasksApi();
  const isMigrationPerformed = useRef(false);

  const migrationMutation = useMutation({
    mutationFn: async () => {
      const localStorageTasks = await tasksApiStorage.fetchTasks();

      for (const task of localStorageTasks) {
        await tasksApiRemote.createTask(task);
      }

      localStorage.removeItem(CONFIG.STORAGE_KEYS.TASKS);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks(isAuthenticated),
      });
      queryClient.removeQueries({
        queryKey: queryKeys.tasks(false),
      });
    },
    onError: () => {
      isMigrationPerformed.current = false;
    },
  });

  useEffect(() => {
    if (isAuthenticated && !isMigrationPerformed.current) {
      isMigrationPerformed.current = true;

      migrationMutation.mutate();
    }
  }, [isAuthenticated, isMigrationPerformed, migrationMutation]);

  return migrationMutation;
}
