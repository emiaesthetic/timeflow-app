import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { MorphingBorder } from '@/shared/ui/MorphingBorder';

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
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title className="text-center text-2xl">
            {task.title}
          </Dialog.Title>
          <Dialog.Description
            aria-describedby={`${task.title} timer`}
          ></Dialog.Description>
        </Dialog.Header>

        <MorphingBorder className="mx-auto mb-5 max-w-[320px] sm:max-w-[70%]">
          <div
            className="flex items-center justify-center gap-x-1 rounded-xl text-5xl font-medium sm:text-6xl"
            role="timer"
            aria-live="polite"
            aria-label={`Timer: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
          >
            <span className="inline-flex size-18 items-center justify-center">
              {hours}
            </span>
            <span>:</span>
            <span className="inline-flex size-18 items-center justify-center">
              {minutes}
            </span>
            <span>:</span>
            <span className="inline-flex size-18 items-center justify-center">
              {seconds}
            </span>
          </div>
        </MorphingBorder>

        <Dialog.Footer className="justify-center">
          {isRunning ? (
            <Button onClick={toggleRunning}>Pause</Button>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={toggleRunning}>Continue</Button>
              <Button onClick={onStopTimer}>Stop</Button>
            </div>
          )}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
