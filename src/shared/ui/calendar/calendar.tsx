import { useCallback, useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { ChevronIcon } from '../icons';
import { Input } from '../input';

import 'react-day-picker/style.css';
import style from './calendar.module.scss';

export const Calendar = ({
  value,
  onSelect,
}: {
  value: string | undefined;
  onSelect: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className={style['calendar-wrapper']} ref={calendarRef}>
      <Input
        value={value}
        onClick={() => setIsOpen(prevState => !prevState)}
        readOnly
      />
      {isOpen && (
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
          onSelect={onSelect}
          components={{
            Chevron: () => <ChevronIcon width="24" height="24" />,
          }}
        />
      )}
    </div>
  );
};
