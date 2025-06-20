import { useTimerContext } from './useTimerContext';

export const useOpenTimer = () => {
  const { startTimer, closeTimer } = useTimerContext();

  return {
    startTimer,
    closeTimer,
  };
};
