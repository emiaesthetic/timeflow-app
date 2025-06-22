import { createContext, useContext } from 'react';

import { useTimer } from './useTimer';

export const TimerContext = createContext<ReturnType<typeof useTimer> | null>(
  null,
);

export const useTimerContext = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }

  return context;
};
