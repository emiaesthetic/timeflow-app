import { useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '@/shared/model/use-outside-click';

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
    <div className="calendar-wrapper" ref={calendarWrapperRef}>
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
              disabled={{ before: new Date() }}
            />
          </div>,
          calendarPortal,
        )}
    </div>
  );
};
