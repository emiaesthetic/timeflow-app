import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryKeys } from '@/shared/constants';

import { userApi } from '../api/userApi';

import { User } from './types';

export function useUserQuery(options?: { enabled: boolean }) {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery<User, AxiosError, User>({
    queryKey: queryKeys.user(),
    queryFn: userApi.getMe,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: options?.enabled ?? true,
  });

  return { user, isPending, isError, error };
}
