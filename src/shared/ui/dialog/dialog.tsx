import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '@/shared/model/use-outside-click';

import { Button } from '../button';
import { CrossIcon } from '../icons';

import style from './dialog.module.scss';

interface IDialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  dialogTitle: React.ReactNode;
  dialogContent: React.ReactNode;
  dialogFooter: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DialogHeader = ({ children }: { children: React.ReactNode }) => {
  return <header className={style.dialog__header}>{children}</header>;
};

const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.dialog__content}>{children}</div>;
};

const DialogFooter = ({ children }: { children: React.ReactNode }) => {
  return <footer className={style.dialog__content}>{children}</footer>;
};

export const Dialog = ({
  dialogTitle,
  dialogContent,
  dialogFooter,
  isOpen,
  onClose,
  ...props
}: IDialogProps) => {
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
      if (isOpen && event.key === 'Escape') onClose();
    },
    [isOpen, onClose],
  );

  useOutsideClick({
    refs: [dialogRef],
    callback: onClose,
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
    <dialog className={style.dialog} ref={dialogRef} {...props}>
      <div className={style.dialog__container}>
        <Dialog.Header>
          {dialogTitle}
          <Button
            variant="icon"
            type="button"
            aria-label="Close task creation form"
            onClick={onClose}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          >
            <CrossIcon width="32" height="32" />
          </Button>
        </Dialog.Header>
        <Dialog.Content>{dialogContent}</Dialog.Content>
        <Dialog.Footer>{dialogFooter}</Dialog.Footer>
      </div>
      <div id="dialog-portal-overlay"></div>
    </dialog>,
    dialogPortal,
  );
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
