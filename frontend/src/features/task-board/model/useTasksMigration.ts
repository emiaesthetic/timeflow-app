import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/features/auth';

import { getAxiosErrorMessage } from '@/shared/lib/getAxiosErrorMessage';

import { tasksApiRemote } from '../api/taskApiRemote';
import { STORAGE_KEY, tasksApiStorage } from '../api/taskApiStorage';
import { transformTaskToFormDate } from '../lib/transformTask';

export const useTasksMigration = (onMigrationComplete: () => void) => {
  const { token: isAuthenticated } = useAuth();
  const isMigrated = useRef(false);

  const performMigration = useCallback(async () => {
    if (isMigrated.current) return;

    isMigrated.current = true;

    try {
      const tasks = await tasksApiStorage.fetchTasks();

      for (const task of tasks) {
        const formData = transformTaskToFormDate(task);
        await tasksApiRemote.createTask({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          duration: formData.duration,
          priority: formData.priority,
          status: formData.status,
        });
      }

      onMigrationComplete();
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    }
  }, [onMigrationComplete]);

  useEffect(() => {
    if (isAuthenticated) {
      performMigration();
    }
  }, [isAuthenticated, performMigration]);
};
