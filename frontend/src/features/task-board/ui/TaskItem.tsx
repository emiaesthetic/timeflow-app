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

export function TaskItemSkeleton() {
  return (
    <div
      className="bg-card/15 relative h-full rounded-lg shadow-lg"
      aria-label="Loading task item"
    >
      <div className="grid h-full w-full grid-cols-[1fr_auto] grid-rows-1 place-items-center gap-6 p-6">
        <div className="row-span-2 flex h-full w-full min-w-0 grid-cols-[2fr_1fr] flex-col justify-between gap-x-8">
          <div className="mb-4">
            <div
              className="bg-primary/30 mb-2 h-8 w-[70%] animate-pulse rounded-sm"
              aria-hidden="true"
            ></div>
            <div
              className="bg-primary/30 h-6 w-full animate-pulse rounded-sm"
              aria-hidden="true"
            ></div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-x-2 text-center">
            <div className="flex w-[60%] flex-wrap gap-x-2 gap-y-1">
              <div
                className="bg-primary/30 h-7 w-[45%] animate-pulse rounded-sm"
                aria-hidden="true"
              ></div>
              <div
                className="bg-primary/30 h-7 w-[45%] animate-pulse rounded-sm"
                aria-hidden="true"
              ></div>
            </div>
            <div
              className="bg-primary/30 h-6 w-[30%] animate-pulse rounded-sm"
              aria-hidden="true"
            ></div>
          </div>
        </div>

        <div
          className="bg-primary/30 size-10 animate-pulse self-start rounded-md"
          aria-hidden="true"
        ></div>
        <div
          className="bg-primary/30 [grid-column:2] [grid-row:2] size-8 animate-pulse rounded-md"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}

export function TaskItem({
  task,
  onUpdateStatus,
  onOpenTimer,
  onOpenEditor,
  deleteTask,
}: {
  task: Task;
  onUpdateStatus: () => void;
  onOpenTimer: () => void;
  onOpenEditor: () => void;
  deleteTask: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        'bg-card/15 text-card-foreground relative h-full overflow-hidden rounded-lg shadow-lg',
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

      <div
        className={cn(
          'grid h-full w-full grid-cols-[1fr_auto] grid-rows-1 place-items-center gap-6 p-6',
          task.status === 'DONE' && 'text-muted-foreground',
        )}
      >
        <div className="row-span-2 flex h-full w-full min-w-0 grid-cols-[2fr_1fr] flex-col justify-between gap-x-8">
          <div className="mb-4">
            <h3
              className={cn(
                'mb-2 overflow-x-hidden text-2xl font-semibold text-ellipsis',
                task.status === 'DONE' && 'line-through',
              )}
            >
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

        <div className="relative self-start">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button size="icon" aria-label="Open menu">
                <EllipsisIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-40" align="end">
              <DropdownMenu.Group>
                {task.status === 'PROCESS' && (
                  <>
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
                  </>
                )}
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
          onClick={onUpdateStatus}
          checked={task.status === 'DONE'}
        />
      </div>
    </article>
  );
}
