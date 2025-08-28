import { useState } from 'react';

import { Task } from '@/entities/task';

export function useCurrentTask() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const selectCurrentTask = (task: Task) => {
    if (!task) return;

    setCurrentTask(task);
  };

  const resetCurrentTask = () => {
    setCurrentTask(null);
  };

  return { currentTask, selectCurrentTask, resetCurrentTask };
}
