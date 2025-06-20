import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';

import { formatTimer } from './lib/formatTimer';
import { useTimerContext } from './lib/useTimerContext';

export const Layout = () => {
  const {
    isOpen,
    currentTask,
    remainingTime,
    isEnabled,
    toggleTimer,
    closeTimer,
  } = useTimerContext();

  if (!currentTask) return null;

  return (
    <Dialog
      header={
        <header className="border-border/5 mb-8 border-b border-solid pb-4">
          <h1 className="text-3xl font-bold">{currentTask.title}</h1>
        </header>
      }
      body={
        <div className="timer-border bg-secondary mx-auto mb-10 w-max rounded-xl p-8 text-center">
          <time
            className="text-3xl font-medium md:text-5xl"
            dateTime={formatTimer(currentTask.duration)}
          >
            {formatTimer(remainingTime)}
          </time>
        </div>
      }
      footer={
        <footer className="flex items-center justify-center gap-x-8">
          {remainingTime > 0 && (
            <>
              <Button onClick={toggleTimer}>
                {isEnabled ? 'Pause' : 'Continue'}
              </Button>

              {!isEnabled && <Button onClick={closeTimer}>Stop</Button>}
            </>
          )}
        </footer>
      }
      className="w-full max-w-120"
      id="taskTimer"
      isOpen={isOpen}
      canClose={true}
      onClose={closeTimer}
    />
  );
};
