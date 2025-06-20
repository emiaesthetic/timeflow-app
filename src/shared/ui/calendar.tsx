import { useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '@/shared/lib/useOutsideClick';

import { ChevronIcon } from './icons';

import 'react-day-picker/style.css';

export const Calendar = ({
  value,
  trigger,
  position,
  isOpen,
  onClose,
  onSelect,
}: {
  value: Date | undefined;
  trigger: React.ReactNode;
  position: { top: number; left: number };
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date | undefined) => void;
}) => {
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    refs: [calendarWrapperRef, calendarRef],
    callback: onClose,
    isOpen,
  });

  const calendarPortal = document.getElementById('dialog-portal-overlay');
  if (!calendarPortal) return;

  return (
    <div ref={calendarWrapperRef}>
      {trigger}
      {isOpen &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            ref={calendarRef}
          >
            <DayPicker
              className="bg-background text-foreground w-max rounded-2xl border-0 p-4 shadow-md"
              classNames={{
                day_button:
                  'hover:bg-primary hover:text-primary-foreground size-full rounded-xl bg-inherit text-inherit transition-colors',
                today: 'text-accent-foreground',
                selected: 'bg-primary text-primary-foreground rounded-xl',
                button_previous:
                  'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground absolute top-0 left-0 flex size-10 items-center justify-center rounded-xl transition-colors',
                button_next:
                  'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground absolute top-0 right-0 flex size-10 -rotate-180 items-center justify-center rounded-xl transition-colors',
                chevron: 'text-inherit',
              }}
              animate
              mode="single"
              navLayout="around"
              selected={value}
              onSelect={onSelect}
              components={{
                Chevron: () => <ChevronIcon className="size-6" />,
              }}
              disabled={{ before: new Date() }}
            />
          </div>,
          calendarPortal,
        )}
    </div>
  );
};
