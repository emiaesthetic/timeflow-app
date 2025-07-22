import { createContext, useContext } from 'react';

import { TasksApi } from './types';

export const TasksApiContext = createContext<TasksApi | null>(null);

export const useTasksApi = () => {
  const context = useContext(TasksApiContext);

  if (!context) {
    throw new Error('useCardsApi must be use within a TasksApiProvider');
  }

  return context;
};
