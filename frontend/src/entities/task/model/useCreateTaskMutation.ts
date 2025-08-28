import { createId } from '@paralleldrive/cuid2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { useTasksApi } from './TasksApiContext';
import { Task } from './types';

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated, api } = useTasksApi();
  const queryKey = queryKeys.tasks(isAuthenticated);

  return useMutation({
    mutationFn: (payload: Omit<Task, 'id'>) => api.createTask(payload),
    onMutate: async (payload: Omit<Task, 'id'>) => {
      await queryClient.cancelQueries({ queryKey });

      const prevTasks = queryClient.getQueryData<Task[]>(queryKey) || [];

      const optimisticId = createId();
      const optimisticTask = {
        id: optimisticId,
        ...payload,
      };

      queryClient.setQueryData(queryKey, (prevTasks: Task[] = []) => {
        return [...prevTasks, optimisticTask];
      });

      return { prevTasks, optimisticId };
    },
    onError: (_, __, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(queryKey, context.prevTasks);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
}
