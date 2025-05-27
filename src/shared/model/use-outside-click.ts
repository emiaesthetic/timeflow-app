import { useCallback, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>({
  refs,
  callback,
  isOpen,
  isDialog = false,
}: {
  refs: React.RefObject<T | null>[];
  callback: () => void;
  isOpen: boolean;
  isDialog?: boolean;
}) => {
  const listener = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isOpen) return;

      const clickedOutside = isDialog
        ? refs.every(ref => ref.current === event.target)
        : refs.every(ref => !ref.current?.contains(event.target as Node));

      if (clickedOutside) {
        callback();
      }
    },
    [isOpen, isDialog, refs, callback],
  );

  useEffect(() => {
    document.addEventListener('click', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [listener]);
};
