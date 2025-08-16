import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { authStore } from '@/features/auth';
import { setupAxiosWithAuth } from '@/features/auth/api/setupAxiosWithAuth';
import { TasksApiProvider } from '@/features/task-board';

import { Toaster } from '@/shared/ui/Sonner';

import { QueryProvider } from './providers/QueryProvider';

export function App() {
  const { isAuthenticated, token } = authStore();

  useEffect(() => {
    setupAxiosWithAuth();
  }, [token]);

  return (
    <QueryProvider>
      <TasksApiProvider isAuthenticated={isAuthenticated}>
        <Outlet />
      </TasksApiProvider>
      <Toaster />
    </QueryProvider>
  );
}
