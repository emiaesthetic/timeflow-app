import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';

export const App = () => {
  const { initializeSession } = useAuthStore();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <>
      <Outlet />
    </>
  );
};
