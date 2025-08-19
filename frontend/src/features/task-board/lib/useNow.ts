import { useLayoutEffect, useState } from 'react';

export function useNow({
  isEnabled,
  intervalMs = 1000,
}: {
  isEnabled?: boolean;
  intervalMs?: number;
}) {
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!isEnabled) return;

    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, isEnabled]);

  return now;
}
