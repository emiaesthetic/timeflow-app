import { useState } from 'react';

import { Task } from './types';

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
