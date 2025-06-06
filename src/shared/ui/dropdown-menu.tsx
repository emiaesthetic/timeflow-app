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
            className="absolute top-[calc(100% + 2px)] right-0 z-100 w-max rounded-lg shadow-[var(--shadow)] bg-inherit"
            id="dropdown-menu"
          >
            {items.map(item => (
              <li>
                <button
                  className="flex gap-x-2 items-center w-full py-4 pl-6 pr-10 rounded-lg bg-transparent text-[var(--foreground-primary)] hover:bg-[var(--background-primary)]"
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
