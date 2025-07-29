import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { TasksApiProvider } from '@/features/task-board';

import { initAxiosWithAuth } from '@/shared/api';
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
    <>
      <TasksApiProvider isAuthenticated={isAuthenticated}>
        <Outlet />
      </TasksApiProvider>
      <Toaster />
    </>
  );
}
