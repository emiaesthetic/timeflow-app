import { useState } from 'react';

import { useCurrentTask } from '@/shared/model/useCurrentTask';
import { Task } from '@/shared/types/task';

export const useEditor = () => {
  const { currentTask, setCurrentTask, resetCurrentTask } = useCurrentTask();
  const [isOpen, setIsOpen] = useState(false);

  const openForCreate = () => {
    setIsOpen(true);
  };

  const openForEdit = (task: Task) => {
    setCurrentTask(task);
    setIsOpen(true);
  };

  const closeEditor = () => {
    setIsOpen(false);
    resetCurrentTask();
  };

  return {
    isOpen,
    currentTask,
    openForCreate,
    openForEdit,
    closeEditor,
  };
};
