import { useState } from 'react';

import { useNow } from '../lib/useNow';

export function useTimer(timestamp: number = 0) {
  const [isOpen, setIsOpen] = useState(false);
  const [startAt, setStartAt] = useState<number | undefined>();
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const now = useNow({ updateInterval: 1000, isEnabled: !!startAt });

  const elapsedTime = accumulatedTime + now - (startAt ?? now);
  const remainingTime = Math.max(0, timestamp - elapsedTime);

  const toggleRunning = () => {
    if (startAt) {
      setAccumulatedTime(prev => prev + now - startAt);
      setStartAt(undefined);
    } else {
      setStartAt(Date.now());
    }
  };

  const open = () => {
    setIsOpen(true);
    toggleRunning();
  };

  const close = () => {
    setIsOpen(false);
    setStartAt(undefined);
    setAccumulatedTime(0);
  };

  const toggle = () => {
    if (!isOpen) open();
    if (isOpen) close();
  };

  return {
    isOpen,
    isRunning: !!startAt,
    remainingTime,
    open,
    close,
    toggle,
    toggleRunning,
  };
}
