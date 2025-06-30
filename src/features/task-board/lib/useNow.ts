import { useLayoutEffect, useState } from 'react';

export function useNow({
  updateInterval,
  isEnabled,
}: {
  updateInterval: number;
  isEnabled?: boolean;
}) {
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
}
