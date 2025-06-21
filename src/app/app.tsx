import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/app/auth';

import { EditorProvider } from '@/modules/task-editor';
import { TimerProvider } from '@/modules/task-timer';

export const App = () => {
  const { loading, initializeSession } = useAuth();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!loading && !code) {
      initializeSession();
    }
  }, [loading, searchParams, initializeSession]);

  return (
    <EditorProvider>
      <TimerProvider>
        <Outlet />
      </TimerProvider>
    </EditorProvider>
  );
};
