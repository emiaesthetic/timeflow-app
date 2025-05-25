import { useCallback, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { createPortal } from 'react-dom';

import { ChevronIcon } from '../icons';

import 'react-day-picker/style.css';
import style from './calendar.module.scss';

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
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  const calendarPortal = document.getElementById('dialog-portal-overlay');
  if (!calendarPortal) return;

  return (
    <div className="calendar-wrapper" ref={calendarRef}>
      {input}
      {isOpen &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <DayPicker
              className={style.calendar}
              classNames={{
                day_button: `${style['calendar__day-button']}`,
                today: `${style.calendar__today}`,
                selected: `${style.calendar__selected}`,
                button_previous: `${style['calendar__chevron-button']} ${style['calendar__chevron-button--previous']}`,
                button_next: `${style['calendar__chevron-button']} ${style['calendar__chevron-button--next']}`,
                chevron: `${style['calendar__chevron-icon']}`,
              }}
              animate
              mode="single"
              navLayout="around"
              selected={value}
              onSelect={onSelect}
              components={{
                Chevron: () => <ChevronIcon width="24" height="24" />,
              }}
            />
          </div>,
          calendarPortal,
        )}
    </div>
  );
};
