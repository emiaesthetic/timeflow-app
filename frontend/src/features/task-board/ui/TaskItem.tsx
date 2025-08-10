import {
  CirclePlayIcon,
  EllipsisIcon,
  SquarePenIcon,
  TrashIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';

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
        'bg-card/15 text-card-foreground overflow-hidden; relative h-full rounded-lg shadow-lg',
      )}
    >
      <div
        className={cn(
          'absolute top-[5%] left-[3%] -z-10 h-[90%] w-[94%] opacity-50 blur-md',
          task.priority === 'HIGH' && 'bg-accent-3',
          task.priority === 'MEDIUM' && 'bg-accent-2',
          task.priority === 'LOW' && 'bg-accent-1',
        )}
        aria-hidden="true"
      />

      <div className="grid h-full w-full grid-cols-[1fr_auto] grid-rows-1 place-items-center gap-6 p-6">
        <div className="row-span-2 flex h-full w-full min-w-0 grid-cols-[2fr_1fr] flex-col justify-between gap-x-8">
          <div className="mb-4">
            <h3 className="mb-2 overflow-x-hidden text-2xl font-semibold text-ellipsis">
              {task.title}
            </h3>
            <p className="overflow-x-hidden font-normal text-ellipsis">
              {task.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-center">
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-lg font-medium">
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

        <div className="relative self-start bg-inherit">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button size="icon" aria-label="Open menu">
                <EllipsisIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-40" align="end">
              <DropdownMenu.Group>
                <DropdownMenu.Item>
                  <Button
                    className="w-full justify-start bg-transparent hover:bg-transparent"
                    variant="ghost"
                    onClick={onOpenTimer}
                  >
                    <CirclePlayIcon />
                    Start
                  </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Button
                    className="w-full justify-start bg-transparent hover:bg-transparent"
                    variant="ghost"
                    size="sm"
                    onClick={onOpenEditor}
                  >
                    <SquarePenIcon />
                    Edit
                  </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <Button
                    className="w-full justify-start bg-transparent hover:bg-transparent"
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    <TrashIcon />
                    Delete
                  </Button>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>

        <Checkbox
          className="border-primary [grid-column:2] [grid-row:2] border-2"
          name="complete"
          aria-label="Mark task as complete"
        />
      </div>
    </article>
  );
}
