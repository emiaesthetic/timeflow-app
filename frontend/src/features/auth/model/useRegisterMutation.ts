import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { queryKeys } from '@/shared/constants';

import { authApi } from '../api/authApi';

import { authStore } from './authStore';
import { RegisterFormData } from './types';

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.user();
  const { setToken } = authStore();

  const mutation = useMutation({
    mutationFn: (payload: RegisterFormData) => {
      return authApi.register(payload);
    },
    onSuccess: ({ token, user }) => {
      setToken(token);
      queryClient.setQueryData(queryKey, user);
      toast.success('Successfully registered!');
    },
    onError: error => {
      toast.error(getErrorMessage(error));
    },
  });

  return mutation;
}
