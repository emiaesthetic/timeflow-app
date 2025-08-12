import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryKeys } from '@/shared/constants';

import { useTasksApi } from './TasksApiContext';
import { Task } from './types';

export function useTasksQuery() {
  const { isAuthenticated, api } = useTasksApi();
  const {
    data: tasks = [],
    isPending,
    isError,
    error,
  } = useQuery<Task[], AxiosError, Task[]>({
    queryKey: queryKeys.tasks(isAuthenticated),
    queryFn: api.fetchTasks,
  });

  return { tasks, isPending, isError, error };
}
