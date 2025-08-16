import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { queryKeys } from '@/shared/constants';

import { authApi } from '../api/authApi';

import { authStore } from './authStore';

export function useLoginWithGithubMutation() {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user();
  const { setToken } = authStore();

  const mutation = useMutation({
    mutationFn: (payload: string) => {
      return authApi.loginWithGithub(payload);
    },
    onSuccess: ({ token, user }) => {
      setToken(token);
      queryClient.setQueryData(queryKey, user);
      toast.success('Successfully authorized!');
    },
    onError: error => {
      toast.error(getErrorMessage(error));
    },
  });

  return mutation;
}
