import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Dialog } from '@/shared/ui/dialog';
import { DropdownMenu } from '@/shared/ui/dropdown-menu';
import {
  CrossIcon,
  DottedIcon,
  EditIcon,
  PlayIcon,
  PlusIcon,
} from '@/shared/ui/icons';
import { Layout } from '@/shared/ui/layout';

import { formatDateParts } from '../../lib/format-date';
import { formatTime } from '../../lib/format-time';
import {
  transformFormDateToTask,
  transformTaskToFormDate,
} from '../../lib/transform-task';
import { ITask, ITaskFormData } from '../../model/types';
import { useLocalStorage } from '../../model/use-local-storage';
import { useTimer } from '../../model/use-timer';
import { TaskForm } from '../task-form';

import EmptyIcon from './img/empty.svg?react';

import styleBoard from './task-board.module.scss';
import styleItem from './task-item.module.scss';
import styleTimer from './task-timer.module.scss';

interface ITaskItemProps extends ITask {
  onStart: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export const TaskItem = ({
  title,
  description,
  date,
  duration,
  priority,
  onStart,
  onEdit,
  onRemove,
}: ITaskItemProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { displayDate, displayTime, dateAttr, timeAttr } =
    formatDateParts(date);

  return (
    <article
      className={clsx(styleItem.task, styleItem[`task--${priority}`], {
        [styleItem['task--has-open-dropdown']]: isOpenDropdown,
      })}
    >
      <div className={`${styleItem.task__complete} hidden-mobile-large`}>
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>

      <div className={styleItem.task__content}>
        <div className={styleItem.task__details}>
          <h3 className={styleItem.task__name}>{title}</h3>
          <p className={styleItem.task__description}>{description}</p>
        </div>

        <div className={styleItem.task__schedule}>
          <div className={styleItem.task__datetime}>
            <time className={styleItem.task__date} dateTime={dateAttr}>
              {displayDate},
            </time>
            <time className={styleItem.task__time} dateTime={timeAttr}>
              {displayTime}
            </time>
          </div>

          <data
            className={styleItem.task__duration}
            value={`PT${duration / 60_000}M`}
          >
            {duration / 60_000} minutes
          </data>
        </div>
      </div>

      <div className={styleItem.task__actions}>
        <ul className={`${styleItem['task__actions-list']} hidden-laptop`}>
          <li className={styleItem['task__actions-item']}>
            <Button variant="icon" onClick={onStart}>
              <PlayIcon width="32" height="32" />
            </Button>
          </li>
          <li className={styleItem['task__actions-item']}>
            <Button variant="icon" onClick={onEdit}>
              <EditIcon width="32" height="32" />
            </Button>
          </li>
          <li className={styleItem['task__actions-item']}>
            <Button variant="icon" onClick={onRemove}>
              <CrossIcon width="32" height="32" />
            </Button>
          </li>
        </ul>

        <DropdownMenu
          className="visible-laptop"
          trigger={{
            children: <DottedIcon />,
            variant: 'icon',
            ariaLabel: 'Open task menu',
          }}
          items={[
            {
              label: 'Start',
              icon: <PlayIcon width="20" height="20" />,
              onClick: () => {
                onStart();
                setIsOpenDropdown(false);
              },
            },
            {
              label: 'Edit',
              icon: <EditIcon width="20" height="20" />,
              onClick: () => {
                onEdit();
                setIsOpenDropdown(false);
              },
            },
            {
              label: 'Delete',
              icon: <CrossIcon width="20" height="20" />,
              onClick: () => {
                onRemove();
                setIsOpenDropdown(false);
              },
            },
          ]}
          isOpen={isOpenDropdown}
          onToggle={() => setIsOpenDropdown(!isOpenDropdown)}
        />
      </div>

      <div className={`${styleItem.task__complete} visible-mobile-large`}>
        <Checkbox name="complete" aria-label="Mark task as complete" />
      </div>
    </article>
  );
};

export const TaskBoard = () => {
  const { tasks, addTask, editTask, removeTask } = useLocalStorage();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenTimer, setIsOpenTimer] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | undefined>();

  const { remainingTime, isEnabled, toggleTimer, resetTimer } = useTimer(
    activeTask?.duration || 0,
  );

  const handleSubmit = (data: ITaskFormData) => {
    if (activeTask) {
      editTask({ ...activeTask, ...transformFormDateToTask(data) });
    } else {
      const taskWithID: ITask = {
        id: crypto.randomUUID(),
        ...transformFormDateToTask(data),
      };
      addTask(taskWithID);
    }

    setIsOpenForm(false);
    setActiveTask(undefined);
  };

  const closeForm = () => {
    setActiveTask(undefined);
    setIsOpenForm(false);
  };

  const closeTimer = () => {
    resetTimer();
    setActiveTask(undefined);
    setIsOpenTimer(false);
  };

  return (
    <>
      <section className={styleBoard['task-board']}>
        <Layout>
          <header className={styleBoard['task-board__header']}>
            <h2 className={styleBoard['task-board__title']}>Task List</h2>
            <Button variant="dark" onClick={() => setIsOpenForm(true)}>
              <PlusIcon width="24" height="24" aria-hidden="true" />
              Add new task
            </Button>
          </header>

          {tasks.length === 0 ? (
            <div className={styleBoard['task-board__empty']}>
              <EmptyIcon />
            </div>
          ) : (
            <ul className={styleBoard['task-board__list']}>
              {tasks.map(task => (
                <li key={task.id} className={styleBoard['task-board__item']}>
                  <TaskItem
                    {...task}
                    onStart={() => {
                      setIsOpenTimer(true);
                      setActiveTask(task);
                      toggleTimer();
                    }}
                    onEdit={() => {
                      setIsOpenForm(true);
                      setActiveTask(task);
                    }}
                    onRemove={() => removeTask(task.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </Layout>
      </section>

      <Dialog
        dialogTitle={<h1>{activeTask ? 'Edit task' : 'Create New Task'}</h1>}
        dialogContent={
          <TaskForm
            key={activeTask ? activeTask.id : 'new'}
            defaultValues={
              activeTask ? transformTaskToFormDate(activeTask) : undefined
            }
            onSubmit={handleSubmit}
          />
        }
        dialogFooter={
          <Button variant="dark" type="submit" form="taskForm" fullWidth>
            {activeTask ? 'Update task' : 'Create Task'}
          </Button>
        }
        id="dialog"
        aria-label="Task create/update form"
        isOpen={isOpenForm}
        onClose={closeForm}
      />

      {activeTask && (
        <Dialog
          dialogTitle={<h1>{activeTask.title}</h1>}
          dialogContent={
            <div className={styleTimer.timer}>
              <time
                className={styleTimer.timer__time}
                dateTime={formatTime(activeTask.duration)}
              >
                {formatTime(remainingTime)}
              </time>
            </div>
          }
          dialogFooter={
            <div className={styleTimer.timer__actions}>
              {remainingTime > 0 && (
                <>
                  <Button variant="dark" onClick={toggleTimer}>
                    {isEnabled ? 'Pause' : 'Continue'}
                  </Button>

                  {!isEnabled && (
                    <Button variant="dark" onClick={closeTimer}>
                      Stop
                    </Button>
                  )}
                </>
              )}
            </div>
          }
          id="dialog"
          isOpen={isOpenTimer}
          onClose={closeTimer}
        />
      )}
    </>
  );
};
