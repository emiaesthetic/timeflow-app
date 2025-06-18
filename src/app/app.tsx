import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/app/auth';

export const App = () => {
  const { initializeSession } = useAuth();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <>
      <Outlet />
    </>
  );
};
