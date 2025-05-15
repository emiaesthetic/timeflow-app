import { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Button } from '../button';

import style from './dropdown-menu.module.scss';

interface IDropdownTrigger {
  children: React.ReactNode;
  variant: 'icon' | 'dark';
  ariaLabel?: string;
}

interface IDropdownItem {
  label: string;
  icon?: React.ReactNode;
}

interface IDropdownMenu {
  className: string;
  trigger: IDropdownTrigger;
  items: IDropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export const DropdownMenu = ({
  className,
  trigger,
  items,
  isOpen,
  onToggle,
}: IDropdownMenu) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as HTMLElement)
      ) {
        onToggle();
      }
    },
    [isOpen, onToggle],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className={clsx(style['dropdown-menu'], className)} ref={ref}>
      <>
        <Button
          variant={trigger.variant}
          aria-expanded={isOpen}
          aria-controls="dropdown-menu"
          aria-label={trigger.ariaLabel}
          onClick={onToggle}
        >
          {trigger.children}
        </Button>

        {isOpen && (
          <ul className={style['dropdown-menu__list']} id="dropdown-menu">
            {items.map(item => (
              <li className={style['dropdown-menu__item']}>
                <button className={style['dropdown-menu__button']}>
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
    </div>
  );
};
