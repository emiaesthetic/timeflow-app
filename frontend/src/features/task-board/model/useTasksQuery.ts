import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

import { queryKeys } from '@/shared/constants';

import { useTasksApi } from './TasksApiContext';
import { Task } from './types';

const statusOrder: Record<Task['status'], number> = {
  PROCESS: 1,
  DONE: 2,
};

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

  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => statusOrder[a.status] - statusOrder[b.status],
    );
  }, [tasks]);

  return { tasks: sortedTasks, isPending, isError, error };
}
