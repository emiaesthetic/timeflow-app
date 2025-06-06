import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu } from '@/shared/ui/dropdown-menu';
import { CrossIcon, DottedIcon, EditIcon, PlayIcon } from '@/shared/ui/icons';

import { formatDateParts } from '../lib/format-date';
import { ITask } from '../model/types';

interface ITaskItemProps extends ITask {
  onStart: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export const TaskItem = ({
  title,
  description,
  date,
  duration,
  priority,
  onStart,
  onEdit,
  onRemove,
}: ITaskItemProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { displayDate, displayTime, dateAttr, timeAttr } =
    formatDateParts(date);

  return (
    <article
      className={cn(
        'relative grid grid-rows-[repeat(2,auto)] grid-cols-[1fr_auto] gap-6 md:grid-cols-[auto_1fr_auto] md:gap-y-0 md:p-6 lg:gap-x-10 place-items-center p-8 rounded-2xl bg-[var(--background-primary)] text-[var(--foreground-text)] shadow-[var(--shadow)] hover:scale-[1.005] transition-[scale]',
        priority === 'high' && 'bg-[var(--background-task-high)]',
        priority === 'medium' && 'bg-[var(--background-task-medium)]',
        priority === 'low' && 'bg-[var(--background-task-low)]',
        isOpenDropdown && 'z-1001',
      )}
    >
      <div className="hidden md:flex">
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>

      <div className="row-span-2 md:grid grid-cols-[2fr_1fr] justify-start items-center gap-x-8 w-full">
        <div className="mb-2 md:mb-0">
          <h3 className="mb-2 font-semibold text-2xl">{title}</h3>
          <p className="font-normal">{description}</p>
        </div>

        <div className="flex flex-wrap gap-x-2 items-center text-center md:block">
          <div className="md:flex flex-wrap justify-center gap-x-2 gap-y-1 md:mb-1 font-medium text-lg">
            <time dateTime={dateAttr}>{displayDate},</time>
            <time dateTime={timeAttr}>{displayTime}</time>
          </div>

          <data value={`PT${duration / 60_000}M`}>
            {duration / 60_000} minutes
          </data>
        </div>
      </div>

      <div className="relative bg-inherit">
        <ul className="hidden gap-x-4 lg:inline-flex">
          <li>
            <Button variant="secondary" size="icon" onClick={onStart}>
              <PlayIcon className="size-8" />
            </Button>
          </li>
          <li>
            <Button variant="secondary" size="icon" onClick={onEdit}>
              <EditIcon className="size-8" />
            </Button>
          </li>
          <li>
            <Button variant="secondary" size="icon" onClick={onRemove}>
              <CrossIcon className="size-8" />
            </Button>
          </li>
        </ul>

        <DropdownMenu
          className="lg:hidden"
          renderTrigger={props => (
            <Button
              {...props}
              variant="secondary"
              size="icon"
              aria-label="Open task menu"
            >
              <DottedIcon />
            </Button>
          )}
          items={[
            {
              label: 'Start',
              icon: <PlayIcon className="size-5" />,
              onClick: () => {
                onStart();
                setIsOpenDropdown(false);
              },
            },
            {
              label: 'Edit',
              icon: <EditIcon className="size-5" />,
              onClick: () => {
                onEdit();
                setIsOpenDropdown(false);
              },
            },
            {
              label: 'Delete',
              icon: <CrossIcon className="size-5" />,
              onClick: () => {
                onRemove();
                setIsOpenDropdown(false);
              },
            },
          ]}
          isOpen={isOpenDropdown}
          onToggle={() => setIsOpenDropdown(!isOpenDropdown)}
        />
      </div>

      <div className="[grid-row:2] [grid-column:2] md:hidden">
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>
    </article>
  );
};
