import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';

import { formatTime } from '../lib/format-time';
import { ITask } from '../model/types';

import style from './task-timer.module.scss';

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
        <header className={style['task-timer__header']}>
          <h1 className={style['task-timer__title']}>{task.title}</h1>
        </header>
      }
      body={
        <div className={style['task-timer__content']}>
          <time
            className={style['task-timer__time']}
            dateTime={formatTime(task.duration)}
          >
            {formatTime(remainingTime)}
          </time>
        </div>
      }
      footer={
        <footer className={style['task-timer__footer']}>
          {remainingTime > 0 && (
            <>
              <Button variant="dark" onClick={onToggle}>
                {isEnabled ? 'Pause' : 'Continue'}
              </Button>

              {!isEnabled && (
                <Button variant="dark" onClick={onClose}>
                  Stop
                </Button>
              )}
            </>
          )}
        </footer>
      }
      className="task-timer"
      id="taskTimer"
      isOpen={isOpen}
      canClose={true}
      onClose={onClose}
    />
  );
};
