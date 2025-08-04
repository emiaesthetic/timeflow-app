import { createContext, useContext } from 'react';

import { TasksApi } from './types';

type TasksApiContext = {
  isAuthenticated: boolean;
  api: TasksApi;
};

export const TasksApiContext = createContext<TasksApiContext | null>(null);

export const useTasksApi = () => {
  const context = useContext(TasksApiContext);

  if (!context) {
    throw new Error('useCardsApi must be use within a TasksApiProvider');
  }

  return context;
};
