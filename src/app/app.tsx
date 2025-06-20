import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/app/auth';

import { EditorProvider } from '@/modules/task-editor';
import { TimerProvider } from '@/modules/task-timer';

export const App = () => {
  const { initializeSession } = useAuth();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <EditorProvider>
      <TimerProvider>
        <Outlet />
      </TimerProvider>
    </EditorProvider>
  );
};
