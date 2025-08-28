import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getErrorMessage } from '@/shared/api';
import { queryKeys } from '@/shared/constants';

import { userApi } from '../api/userApi';

import { User } from './types';

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user();

  return useMutation({
    mutationKey: queryKey,
    mutationFn: (payload: Partial<User>) => userApi.updateMe(payload),
    onError: error => getErrorMessage(error),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
}
