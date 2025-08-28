import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { useTasksApi } from './TasksApiContext';
import { Task, TaskId } from './types';

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated, api } = useTasksApi();
  const queryKey = queryKeys.tasks(isAuthenticated);

  return useMutation({
    mutationKey: queryKey,
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: TaskId;
      payload: Partial<Task>;
    }) => api.updateTask(taskId, payload),
    onMutate: async ({
      taskId,
      payload,
    }: {
      taskId: TaskId;
      payload: Partial<Task>;
    }) => {
      await queryClient.cancelQueries({ queryKey });

      const prevTasks = queryClient.getQueryData<Task[]>(queryKey) || [];

      queryClient.setQueryData(queryKey, (prevTasks: Task[] = []) => {
        return prevTasks.map(task =>
          task.id === taskId ? { ...task, payload } : task,
        );
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
