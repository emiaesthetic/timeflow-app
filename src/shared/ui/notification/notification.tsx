import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { Button } from '../button';
import { CrossIcon, ErrorIcon, SuccessIcon } from '../icons';

import style from './notification.module.scss';

interface INotificationProps {
  type: 'error';
  message: string;
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
      className={clsx(
        style.notification,
        style[`notification--${type}`],
        style[`notification--${position}`],
      )}
    >
      <div className={style.notification__icon}>
        <Icon />
      </div>

      <div className={style.notification__content}>
        <h3 className={style.notification__title}>{title}</h3>
        <p className={style.notification__message}>{message}</p>
      </div>

      <Button variant="icon" type="button" onClick={() => setIsShow(false)}>
        <CrossIcon />
      </Button>
    </div>,
    portal,
  );
};
