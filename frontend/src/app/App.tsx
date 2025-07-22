import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { TasksApiProvider } from '@/features/task-board';

import { Toaster } from '@/shared/ui/Sonner';

export function App() {
  const { isAuthenticated, initializeSession } = useAuth();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <>
      <TasksApiProvider isAuthenticated={isAuthenticated}>
        <Outlet />
      </TasksApiProvider>
      <Toaster />
    </>
  );
}
