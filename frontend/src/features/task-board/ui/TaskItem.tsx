import {
  CirclePlayIcon,
  EllipsisIcon,
  SquarePenIcon,
  TrashIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/DropdownMenu';

import { dateApi } from '../lib/dateApi';
import { Task } from '../model/types';

export function TaskItem({
  task,
  onOpenTimer,
  onOpenEditor,
  deleteTask,
}: {
  task: Task;
  onOpenTimer: () => void;
  onOpenEditor: () => void;
  deleteTask: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        'bg-card text-card-foreground relative grid grid-cols-[auto_1fr] gap-x-4 rounded-2xl shadow-lg shadow-neutral-200',
      )}
    >
      <div
        className={cn(
          'w-6 rounded-l-2xl',
          task.priority === 'HIGH' && 'bg-primary',
          task.priority === 'MEDIUM' && 'bg-primary/50',
          task.priority === 'LOW' && 'bg-primary/20',
        )}
        aria-label={`Task priority: ${task.priority}`}
      ></div>
      <div className="grid w-full grid-cols-[1fr_auto] grid-rows-1 place-items-center gap-6 p-6 pl-0 md:grid-cols-[auto_1fr_auto] md:gap-y-0 lg:gap-x-10">
        <Checkbox
          className="border-primary hidden border-2 md:block"
          name="complete"
          aria-label="Mark task as complete"
        />

        <div className="row-span-2 w-full grid-cols-[2fr_1fr] items-center justify-start gap-x-8 md:grid">
          <div className="mb-2 md:mb-0">
            <h3 className="mb-2 text-2xl font-semibold">{task.title}</h3>
            <p className="font-normal">{task.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-center md:block">
            <div className="flex-wrap justify-center gap-x-2 gap-y-1 text-lg font-medium md:mb-1 md:flex">
              <time dateTime={dateApi.formatDateForHtmlAttr(task.date)}>
                {dateApi.formatDateForDisplay(task.date)},
              </time>
              <time dateTime={dateApi.formatTimeForHtmlAttr(task.date)}>
                {dateApi.formatTimeForDisplay(task.date)}
              </time>
            </div>

            <data value={`PT${task.duration / 60_000}M`}>
              {task.duration / 60_000} minutes
            </data>
          </div>
        </div>

        <div className="relative bg-inherit">
          <ul className="hidden gap-x-2 lg:inline-flex">
            <li>
              {' '}
              <Button size="icon" onClick={onOpenTimer} aria-label="Start task">
                <CirclePlayIcon />
              </Button>
            </li>
            <li>
              <Button
                size="icon"
                type="button"
                aria-label="Edit task"
                onClick={onOpenEditor}
              >
                <SquarePenIcon />
              </Button>
            </li>
            <li>
              <Button
                size="icon"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                <TrashIcon />
              </Button>
            </li>
          </ul>

          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden" asChild>
              <Button size="icon" aria-label="Open menu">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    size="sm"
                    onClick={onOpenTimer}
                  >
                    <CirclePlayIcon />
                    Start
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={onOpenEditor}
                  >
                    <SquarePenIcon />
                    Edit
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    <TrashIcon />
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Checkbox
          className="border-primary [grid-column:2] [grid-row:2] border-2 md:hidden"
          name="complete"
          aria-label="Mark task as complete"
        />
      </div>
    </article>
  );
}
