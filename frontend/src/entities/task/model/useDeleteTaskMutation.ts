import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { useTasksApi } from './TasksApiContext';
import { Task, TaskId } from './types';

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated, api } = useTasksApi();
  const queryKey = queryKeys.tasks(isAuthenticated);

  return useMutation({
    mutationFn: (taskId: TaskId) => {
      return api.deleteTask(taskId);
    },
    onMutate: async (taskId: TaskId) => {
      await queryClient.cancelQueries({ queryKey });

      const prevTasks = queryClient.getQueryData<Task[]>(queryKey) || [];

      queryClient.setQueryData(queryKey, (prevTasks: Task[] = []) => {
        return prevTasks.filter(task => task.id !== taskId);
      });

      return { prevTasks };
    },
    onError: (_, __, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(queryKey, context.prevTasks);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
}
