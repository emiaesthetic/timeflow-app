import { Button } from '@/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/Dialog';

import { formatTimer } from '../lib/formatTimer';
import { Task } from '../model/types';

export function TaskTimer({
  task,
  isOpen,
  isRunning,
  remainingTime,
  toggleRunning,
  onOpenChange,
  onStopTimer,
}: {
  task: Task | null;
  isOpen: boolean;
  isRunning: boolean;
  remainingTime: number;
  toggleRunning: () => void;
  onOpenChange: (open: boolean) => void;
  onStopTimer: () => void;
}) {
  if (!task) return null;

  const { hours, minutes, seconds } = formatTimer(remainingTime);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {task.title}
          </DialogTitle>
          <DialogDescription
            aria-describedby={`${task.title} timer`}
          ></DialogDescription>
        </DialogHeader>

        <div
          className="mx-auto flex items-center justify-center gap-x-1 rounded-xl p-4 text-center text-5xl font-medium"
          role="timer"
          aria-live="polite"
          aria-label={`Timer: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
        >
          <span className="bg-primary text-primary-foreground inline-flex size-18 items-center justify-center rounded-lg">
            {hours}
          </span>
          <span>:</span>
          <span className="bg-primary text-primary-foreground inline-flex size-18 items-center justify-center rounded-lg">
            {minutes}
          </span>
          <span>:</span>
          <span className="bg-primary text-primary-foreground inline-flex size-18 items-center justify-center rounded-lg">
            {seconds}
          </span>
        </div>

        <DialogFooter className="justify-center gap-4">
          <Button className="w-20" type="button" onClick={toggleRunning}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>

          <Button className="w-20" type="button" onClick={onStopTimer}>
            Stop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
