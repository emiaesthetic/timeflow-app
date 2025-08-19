import { useEffect, useRef, useState } from 'react';

export function useSkeleton({
  isPending,
  delayBeforeShow = 100,
  minShowTime = 500,
}: {
  isPending: boolean;
  delayBeforeShow?: number;
  minShowTime?: number;
}) {
  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showStart = useRef<number | null>(Date.now());

  useEffect(() => {
    if (isPending) {
      showTimeout.current = setTimeout(() => {
        setIsShowSkeleton(true);
        showStart.current = Date.now();
      }, delayBeforeShow);
    } else {
      if (showStart.current) {
        const elapsedTime = Date.now() - showStart.current;
        const remaining = Math.max(minShowTime - elapsedTime, 0);

        hideTimeout.current = setTimeout(() => {
          setIsShowSkeleton(false);
          showStart.current = null;
        }, remaining);
      } else {
        if (showTimeout.current) {
          clearTimeout(showTimeout.current);
          showTimeout.current = null;
        }
      }
    }

    return () => {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [isPending, delayBeforeShow, minShowTime]);

  return { isShowSkeleton };
}
