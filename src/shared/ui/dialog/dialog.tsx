import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isOpen && dialogRef.current === event.target) onClose();
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener('click', handleClickOutside);
    dialog.addEventListener('keydown', handleKeyDown);

    return () => {
      dialog.removeEventListener('click', handleClickOutside);
      dialog.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleClickOutside]);

  const dialogPortal = document.getElementById('dialog-portal');
  if (!dialogPortal) return;

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
    </dialog>,
    dialogPortal,
  );
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
