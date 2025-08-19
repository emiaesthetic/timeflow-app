import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { MorphingBorder } from '@/shared/ui/MorphingBorder';

import { formatTimer } from '../lib/formatTimer';
import { Task } from '../model/types';
import { TimerStatus } from '../model/useTimer';

export function TaskTimer({
  task,
  isOpen,
  status,
  elapsedTime,
  onStartTimer,
  onPauseTimer,
  onOpenChange,
}: {
  task: Task | null;
  isOpen: boolean;
  status: TimerStatus;
  elapsedTime: number;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onOpenChange: (open: boolean) => void;
}) {
  const { hours, minutes, seconds } = formatTimer(elapsedTime);

  if (!task) return null;

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
          {status === 'running' ? (
            <Button onClick={onPauseTimer}>Pause</Button>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={onStartTimer}>
                {elapsedTime ? 'Continue' : 'Start'}
              </Button>
              <Button onClick={() => onOpenChange(false)}>Stop</Button>
            </div>
          )}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
