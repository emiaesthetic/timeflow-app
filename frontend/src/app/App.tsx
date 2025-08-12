import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { TasksApiProvider } from '@/features/task-board';

import { initAxiosWithAuth } from '@/shared/api';
import { queryClient } from '@/shared/api/queryClient';
import { Toaster } from '@/shared/ui/Sonner';

export function App() {
  const { isInitialized, isAuthenticated, token, refresh, initializeSession } =
    useAuth();

  useEffect(() => {
    initAxiosWithAuth({ token, refresh });
  }, [token, refresh]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  if (!isInitialized) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TasksApiProvider isAuthenticated={isAuthenticated}>
        <Outlet />
      </TasksApiProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
