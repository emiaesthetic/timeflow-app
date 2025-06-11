import { useCallback, useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/utils';
import { useOutsideClick } from '@/shared/model/use-outside-click';

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
    <div className={cn('relative z-2 bg-inherit', className)} ref={ref}>
      <>
        {renderTrigger({
          'aria-expanded': isOpen,
          'aria-controls': 'dropdown-menu',
          onClick: onToggle,
        })}

        {isOpen && (
          <ul
            className="top-[calc(100% + 2px)] absolute right-0 z-100 w-max rounded-xl bg-inherit p-1 shadow-[var(--shadow)]"
            id="dropdown-menu"
          >
            {items.map(item => (
              <li>
                <button
                  className="hover:bg-primary/10 flex w-full items-center gap-x-2 rounded-lg bg-transparent py-2 pr-6 pl-6"
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
