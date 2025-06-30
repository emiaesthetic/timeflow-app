import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/app/auth';

export function App() {
  const { loading, initializeSession } = useAuth();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!loading && !code) {
      initializeSession();
    }
  }, [loading, searchParams, initializeSession]);

  return <Outlet />;
}
