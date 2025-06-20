import { useTimer } from './lib/useTimer';
import { TimerContext } from './lib/useTimerContext';

export const TimerProvider = ({ children }: React.PropsWithChildren) => {
  const timer = useTimer();

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};
