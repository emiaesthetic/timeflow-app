import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../api/authApi';

import { authStore } from './authStore';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const { clearToken } = authStore();

  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearToken();
      queryClient.clear();
    },
  });

  return mutation;
}
