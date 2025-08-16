import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryKeys } from '@/shared/constants';

import { authApi } from '../api/authApi';

import { authStore } from './authStore';
import { User } from './types';

export function useUserQuery() {
  const { isAuthenticated } = authStore();
  const queryKey = queryKeys.user();

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery<User, AxiosError, User>({
    queryKey,
    queryFn: authApi.getCurrentUser,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: isAuthenticated,
  });

  return { user, isPending, isError, error };
}
