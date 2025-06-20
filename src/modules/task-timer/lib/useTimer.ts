import { useLayoutEffect, useState } from 'react';

import { useCurrentTask } from '@/shared/model/useCurrentTask';
import { Task } from '@/shared/types/task';

const useNow = (updateInterval: number, isEnabled?: boolean) => {
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!isEnabled) return;

    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, isEnabled]);

  return now;
};

export const useTimer = () => {
  const { currentTask, setCurrentTask, resetCurrentTask } = useCurrentTask();

  const [isOpen, setIsOpen] = useState(false);
  const [startAt, setStartAt] = useState<number | undefined>();
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  const now = useNow(1000, !!startAt);
  const elapsedTime = accumulatedTime + now - (startAt ?? now);

  const timestamp = currentTask?.duration || 0;
  const remainingTime = Math.max(0, timestamp - elapsedTime);

  const startTimer = (task: Task) => {
    setCurrentTask(task);
    toggleTimer();
    setIsOpen(true);
  };

  const closeTimer = () => {
    setIsOpen(false);
    setStartAt(undefined);
    setAccumulatedTime(0);
    resetCurrentTask();
  };

  const toggleTimer = () => {
    if (startAt) {
      setAccumulatedTime(prev => prev + now - startAt);
      setStartAt(undefined);
    } else {
      setStartAt(Date.now());
    }
  };

  return {
    isOpen,
    remainingTime,
    isEnabled: !!startAt,
    currentTask,
    startTimer,
    closeTimer,
    toggleTimer,
  };
};
