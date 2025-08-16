import { createId } from '@paralleldrive/cuid2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { queryKeys } from '@/shared/constants';

import { transformFormDataToPayload } from '../lib/transformTask';

import { useTasksApi } from './TasksApiContext';
import { Task, TaskFormData } from './types';

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated, api } = useTasksApi();
  const queryKey = queryKeys.tasks(isAuthenticated);

  const mutation = useMutation({
    mutationFn: (formData: TaskFormData) => {
      const payload = transformFormDataToPayload(formData);
      return api.createTask(payload);
    },
    onMutate: async (formData: TaskFormData) => {
      await queryClient.cancelQueries({ queryKey });

      const payload = transformFormDataToPayload(formData);

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
