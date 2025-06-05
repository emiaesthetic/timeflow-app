import { useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '@/shared/model/use-outside-click';

import { ChevronIcon } from './icons';

import 'react-day-picker/style.css';

export const Calendar = ({
  value,
  input,
  position,
  isOpen,
  onClose,
  onSelect,
}: {
  value: Date | undefined;
  input: React.ReactNode;
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
      {input}
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
              className="w-max p-4 border-0 rounded-2xl bg-[var(--background-primary)] text-[var(--foreground-primary)] shadow-[var(--shadow)]"
              classNames={{
                day_button:
                  'size-full rounded-xl bg-inherit text-inherit hover:bg-[var(--background-secondary)] hover:text-[var(--foreground-secondary)] transition-[background-color,color]',
                today: 'text-[var(--foreground-accent)]',
                selected:
                  'rounded-xl bg-[var(--background-secondary)] text-[var(--foreground-secondary)]',
                button_previous:
                  'absolute top-0 left-0 flex justify-center items-center size-10 rounded-xl bg-[var(--background-primary)] text-[var(--foreground-primary)] hover:bg-[var(--background-secondary)] hover:text-[var(--foreground-secondary)] transition-[background-color,color]',
                button_next:
                  'absolute top-0 right-0 flex justify-center items-center size-10 rounded-xl -rotate-180 bg-[var(--background-primary)] text-[var(--foreground-primary)] hover:bg-[var(--background-secondary)] hover:text-[var(--foreground-secondary)] transition-[background-color,color]',
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
