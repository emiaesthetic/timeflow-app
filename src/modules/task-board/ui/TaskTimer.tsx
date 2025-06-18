import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';

import { formatTimer } from '../lib/formatTimer';
import { Task } from '../types';

export const TaskTimer = ({
  task,
  isOpen,
  isEnabled,
  remainingTime,
  onToggle,
  onClose,
}: {
  task: Task | undefined;
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
        <header className="border-border/5 mb-8 border-b border-solid pb-4">
          <h1 className="text-3xl font-bold">{task.title}</h1>
        </header>
      }
      body={
        <div className="timer-border bg-secondary mx-auto mb-10 w-max rounded-xl p-8 text-center">
          <time
            className="text-3xl font-medium md:text-5xl"
            dateTime={formatTimer(task.duration)}
          >
            {formatTimer(remainingTime)}
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
