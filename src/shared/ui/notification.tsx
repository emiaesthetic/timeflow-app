import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/utils';

import { Button } from './Button';
import { CrossIcon, ErrorIcon, SuccessIcon } from './icons';

interface INotificationProps {
  type: 'error';
  message: string;
  className?: string;
  position?: 'top-right' | 'bottom-right';
  container?: HTMLElement;
}

const notifications = {
  error: { title: 'Error!', Icon: ErrorIcon },
  success: { title: 'Success!', Icon: SuccessIcon },
};

export const Notification = ({
  type,
  message,
  className,
  position = 'top-right',
  container,
}: INotificationProps) => {
  const [isShow, setIsShow] = useState(false);
  const { title, Icon } = notifications[type];

  useEffect(() => {
    if (message) setIsShow(true);

    const timer = setTimeout(() => {
      setIsShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const portal = container || document.getElementById('notification-portal');

  if (!portal || !isShow || !message) return null;

  return createPortal(
    <div
      className={cn(
        'fixed z-1001 inline-flex w-max items-center justify-between gap-x-4 rounded-2xl p-4',
        position === 'top-right' && 'top-4 right-4',
        position === 'bottom-right' && 'right-4 bottom-4',
        `bg-popover text-popover-foreground shadow-[var(--shadow)]`,
        className,
      )}
    >
      <Icon className={cn(type === 'error' && 'text-destructive')} />

      <div>
        <h3 className="mb-2 font-bold">{title}</h3>
        <p>{message}</p>
      </div>

      <Button
        variant="secondary"
        size="icon"
        type="button"
        onClick={() => setIsShow(false)}
      >
        <CrossIcon />
      </Button>
    </div>,
    portal,
  );
};
