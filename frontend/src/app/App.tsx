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
    initializeSession();
    initAxiosWithAuth({ token, refresh });
  }, [token, initializeSession, refresh]);

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
