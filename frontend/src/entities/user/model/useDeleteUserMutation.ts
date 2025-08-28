import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getErrorMessage } from '@/shared/api';
import { queryKeys } from '@/shared/constants';

import { userApi } from '../api/userApi';

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user();

  return useMutation({
    mutationKey: queryKey,
    mutationFn: userApi.deleteMe,
    onSuccess: () => queryClient.clear(),
    onError: error => getErrorMessage(error),
  });
}
