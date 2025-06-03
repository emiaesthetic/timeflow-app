import { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { useOutsideClick } from '@/shared/model/use-outside-click';

import style from './dropdown-menu.module.scss';

interface IDropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface IDropdownMenu {
  className: string;
  renderTrigger: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ) => React.ReactNode;
  items: IDropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export const DropdownMenu = ({
  className,
  items,
  isOpen,
  renderTrigger,
  onToggle,
}: IDropdownMenu) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ refs: [ref], callback: onToggle, isOpen });

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
        {renderTrigger({
          'aria-expanded': isOpen,
          'aria-controls': 'dropdown-menu',
          onClick: onToggle,
        })}

        {isOpen && (
          <ul className={style['dropdown-menu__list']} id="dropdown-menu">
            {items.map(item => (
              <li className={style['dropdown-menu__item']}>
                <button
                  className={style['dropdown-menu__button']}
                  onClick={item.onClick}
                >
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
