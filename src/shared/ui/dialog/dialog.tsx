import React from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../button';
import { CrossIcon } from '../icons';

import style from './dialog.module.scss';

interface IDialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  dialogTitle: React.ReactNode;
  dialogContent: React.ReactNode;
  dialogFooter: React.ReactNode;
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

export const Dialog = React.forwardRef<HTMLDialogElement, IDialogProps>(
  ({ dialogTitle, dialogContent, dialogFooter, onClose, ...props }, ref) => {
    return createPortal(
      <dialog className={style.dialog} ref={ref} {...props}>
        <DialogHeader>
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
        </DialogHeader>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogFooter>{dialogFooter}</DialogFooter>
      </dialog>,
      document.getElementById('dialog-portal')!,
    );
  },
);

Dialog.displayName = 'Dialog';
