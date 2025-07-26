import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { TasksApiProvider } from '@/features/task-board';

import {
  createAuthenticatedHttpClient,
  setAuthenticatedHttpClient,
} from '@/shared/api/httpClient';
import { Toaster } from '@/shared/ui/Sonner';

export function App() {
  const auth = useAuth();

  useEffect(() => {
    const clientInstance = createAuthenticatedHttpClient({
      getAccessToken: () => auth.token,
      refreshToken: auth.refreshAccessToken,
    });
    setAuthenticatedHttpClient(clientInstance);
  }, [auth]);

  return (
    <>
      <TasksApiProvider isAuthenticated={auth.isAuthenticated}>
        <Outlet />
      </TasksApiProvider>
      <Toaster />
    </>
  );
}
