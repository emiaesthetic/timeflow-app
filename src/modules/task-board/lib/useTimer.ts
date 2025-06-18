import { useLayoutEffect, useState } from 'react';

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

export const useTimer = (timestamp: number) => {
  const [startAt, setStartAt] = useState<number | undefined>();
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  const now = useNow(1000, !!startAt);
  const elapsedTime = accumulatedTime + now - (startAt ?? now);
  const remainingTime = Math.max(0, timestamp - elapsedTime);

  const toggleTimer = () => {
    if (startAt) {
      setAccumulatedTime(prev => prev + now - startAt);
      setStartAt(undefined);
    } else {
      setStartAt(Date.now());
    }
  };

  const resetTimer = () => {
    setStartAt(undefined);
    setAccumulatedTime(0);
  };

  return {
    remainingTime,
    isEnabled: !!startAt,
    toggleTimer,
    resetTimer,
  };
};
