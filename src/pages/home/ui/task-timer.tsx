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
        <header className="mb-8 pb-4 border-b border-solid border-[var(--border-muted)]">
          <h1 className="font-bold text-3xl">{task.title}</h1>
        </header>
      }
      body={
        <div className="w-max mx-auto mb-10 p-8 rounded-xl text-center bg-[var(--background-primary)] timer-border">
          <time
            className="font-medium text-3xl md:text-5xl"
            dateTime={formatTime(task.duration)}
          >
            {formatTime(remainingTime)}
          </time>
        </div>
      }
      footer={
        <footer className="flex justify-center items-center gap-x-8">
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
      className="max-w-120 w-full"
      id="taskTimer"
      isOpen={isOpen}
      canClose={true}
      onClose={onClose}
    />
  );
};
