import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { queryKeys } from '@/shared/constants';

import { transformFormDataToPayload } from '../lib/transformTask';

import { useTasksApi } from './TasksApiContext';
import { Task, TaskFormData, TaskId } from './types';

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated, api } = useTasksApi();
  const queryKey = queryKeys.tasks(isAuthenticated);

  const mutation = useMutation({
    mutationFn: ({
      taskId,
      formData,
    }: {
      taskId: TaskId;
      formData: TaskFormData;
    }) => {
      const payload = transformFormDataToPayload(formData);
      return api.updateTask(taskId, payload);
    },
    onMutate: async ({
      taskId,
      formData,
    }: {
      taskId: TaskId;
      formData: TaskFormData;
    }) => {
      await queryClient.cancelQueries({ queryKey });

      const payload = transformFormDataToPayload(formData);

      const prevTasks = queryClient.getQueryData<Task[]>(queryKey) || [];

      queryClient.setQueryData(queryKey, (prevTasks: Task[] = []) => {
        return prevTasks.map(task =>
          task.id === taskId ? { ...task, payload } : task,
        );
      });

      return { prevTasks };
    },
    onError: (error, _, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(queryKey, context.prevTasks);
      }

      toast.error(getErrorMessage(error));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return mutation;
}
