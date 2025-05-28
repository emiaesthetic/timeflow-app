import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { useOutsideClick } from '@/shared/model/use-outside-click';

import { Button } from '../button';
import { CrossIcon } from '../icons';

import style from './dialog.module.scss';

interface ICommonDialogProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
}

type TDialogProps =
  | (ICommonDialogProps & {
      canClose: true;
      isOpen: boolean;
      onClose: () => void;
    })
  | (ICommonDialogProps & {
      canClose: false;
      isOpen?: true;
      onClose?: undefined;
    });

export const Dialog = ({
  header,
  body,
  footer,
  className,
  isOpen = true,
  canClose,
  onClose,
  ...props
}: TDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && canClose && event.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, canClose, onClose],
  );

  useOutsideClick({
    refs: [dialogRef],
    callback: onClose ? onClose : () => {},
    isDialog: true,
    isOpen,
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const dialogPortal = document.getElementById('dialog-portal');
  if (!dialogPortal) return;

  if (!isOpen) return null;

  return createPortal(
    <dialog
      className={clsx(style.dialog, className)}
      ref={dialogRef}
      {...props}
    >
      <div className={style.dialog__container}>
        {canClose && (
          <div className={style.dialog__close}>
            <Button
              variant="icon"
              type="button"
              aria-label="Close modal window"
              onClick={onClose}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            >
              <CrossIcon width="32" height="32" />
            </Button>
          </div>
        )}
        {header}
        {body}
        {footer}
      </div>
      <div id="dialog-portal-overlay"></div>
    </dialog>,
    dialogPortal,
  );
};
