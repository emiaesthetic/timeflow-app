import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Task } from '@/shared/types/task';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { CrossIcon, DottedIcon, EditIcon, PlayIcon } from '@/shared/ui/icons';

import { formatDateParts } from '../lib/formatDate';

interface TaskItemProps extends Task {
  onStart: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export const TaskItem = ({
  title,
  description,
  date,
  time,
  duration,
  priority,
  onStart,
  onEdit,
  onRemove,
}: TaskItemProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { displayDate, displayTime, dateAttr, timeAttr } = formatDateParts(
    date,
    time,
  );

  return (
    <article
      className={cn(
        'bg-card text-card-foreground relative grid grid-cols-[1fr_auto] grid-rows-1 place-items-center gap-6 rounded-2xl p-8 shadow-md shadow-neutral-200 transition-[scale] hover:scale-[1.005] md:grid-cols-[auto_1fr_auto] md:gap-y-0 md:p-6 lg:gap-x-10',
        priority === 'high' && 'bg-card-high',
        priority === 'medium' && 'bg-card-medium',
        priority === 'low' && 'bg-card-low',
        isOpenDropdown && 'z-1001',
      )}
    >
      <div className="hidden md:flex">
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>

      <div className="row-span-2 w-full grid-cols-[2fr_1fr] items-center justify-start gap-x-8 md:grid">
        <div className="mb-2 md:mb-0">
          <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
          <p className="font-normal">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-center md:block">
          <div className="flex-wrap justify-center gap-x-2 gap-y-1 text-lg font-medium md:mb-1 md:flex">
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

      <div className="[grid-column:2] [grid-row:2] md:hidden">
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>
    </article>
  );
};
