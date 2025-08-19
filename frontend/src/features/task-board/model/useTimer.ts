import { useMemo, useState } from 'react';

import { useNow } from '../lib/useNow';

export type TimerStatus = 'idle' | 'running' | 'paused';

type TimerOptions = {
  initialAccumulatedTime?: number;
  intervalMs?: number;
};

export function useTimer(options?: TimerOptions) {
  const { initialAccumulatedTime = 0, intervalMs = 1000 } = options || {};

  const [status, setStatus] = useState<TimerStatus>('idle');
  const [startAt, setStartAt] = useState<number | null>(null);
  const [accumulatedTime, setAccumulatedTime] = useState(
    initialAccumulatedTime,
  );

  const currentTime = useNow({ isEnabled: status === 'running', intervalMs });

  const elapsedTime = useMemo(() => {
    if (status === 'running' && startAt !== null) {
      return accumulatedTime + currentTime - startAt;
    }
    return accumulatedTime;
  }, [status, startAt, accumulatedTime, currentTime]);

  const start = () => {
    if (status === 'running') return;

    setStatus('running');
    setStartAt(Date.now());
  };

  const pause = () => {
    if (status === 'paused') return;

    setStatus('paused');
    setStartAt(null);
    setAccumulatedTime(prev => prev + (Date.now() - (startAt || Date.now())));
  };

  const reset = () => {
    setStatus('idle');
    setStartAt(null);
    setAccumulatedTime(initialAccumulatedTime);
  };

  return { status, elapsedTime, start, pause, stop, reset };
}
