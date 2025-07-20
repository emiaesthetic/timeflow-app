import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

export function App() {
  const { initializeSession } = useAuth();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return <Outlet />;
}
