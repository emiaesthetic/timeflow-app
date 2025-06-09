import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';

import { formatTime } from '../lib/format-time';
import { ITask } from '../model/types';

export const TaskTimer = ({
  task,
  isOpen,
  isEnabled,
  remainingTime,
  onToggle,
  onClose,
}: {
  task: ITask | undefined;
  isOpen: boolean;
  isEnabled: boolean;
  remainingTime: number;
  onToggle: () => void;
  onClose: () => void;
}) => {
  if (!task) return;

  return (
    <Dialog
      header={
        <header className="mb-8 border-b border-solid border-[var(--border-muted)] pb-4">
          <h1 className="text-3xl font-bold">{task.title}</h1>
        </header>
      }
      body={
        <div className="timer-border mx-auto mb-10 w-max rounded-xl bg-[var(--background-primary)] p-8 text-center">
          <time
            className="text-3xl font-medium md:text-5xl"
            dateTime={formatTime(task.duration)}
          >
            {formatTime(remainingTime)}
          </time>
        </div>
      }
      footer={
        <footer className="flex items-center justify-center gap-x-8">
          {remainingTime > 0 && (
            <>
              <Button onClick={onToggle}>
                {isEnabled ? 'Pause' : 'Continue'}
              </Button>

              {!isEnabled && <Button onClick={onClose}>Stop</Button>}
            </>
          )}
        </footer>
      }
      className="w-full max-w-120"
      id="taskTimer"
      isOpen={isOpen}
      canClose={true}
      onClose={onClose}
    />
  );
};
