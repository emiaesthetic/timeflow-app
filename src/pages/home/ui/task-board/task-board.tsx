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

import { formatDateParts } from '../../lib/formatDate';
import { ITask } from '../../model/types';
import { useLocalStorage } from '../../model/useLocalStorage';
import { TaskForm } from '../task-form';

import EmptyIcon from './img/empty.svg?react';

import styleBoard from './task-board.module.scss';
import styleItem from './task-item.module.scss';

interface ITaskItemProps extends ITask {
  onEdit: () => void;
  onRemove: () => void;
}

export const TaskItem = ({
  title,
  description,
  date,
  duration,
  priority,
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

          <data className={styleItem.task__duration} value="PT30M">
            {duration} minutes
          </data>
        </div>
      </div>

      <div className={styleItem.task__actions}>
        <ul className={`${styleItem['task__actions-list']} hidden-laptop`}>
          <li className={styleItem['task__actions-item']}>
            <Button variant="icon">
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
              onClick: () => {},
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
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | undefined>();

  const handleSubmit = (data: ITask | Omit<ITask, 'id'>) => {
    if (activeTask) {
      editTask({ ...activeTask, ...data });
    } else {
      const taskWithID: ITask = {
        id: crypto.randomUUID(),
        ...data,
      };
      addTask(taskWithID);
    }

    setIsOpenDialog(false);
    setActiveTask(undefined);
  };

  return (
    <>
      <section className={styleBoard['task-board']}>
        <Layout>
          <header className={styleBoard['task-board__header']}>
            <h2 className={styleBoard['task-board__title']}>Task List</h2>
            <Button variant="dark" onClick={() => setIsOpenDialog(true)}>
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
                    onEdit={() => {
                      setIsOpenDialog(true);
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
            defaultValues={activeTask}
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
        isOpen={isOpenDialog}
        onClose={() => {
          setIsOpenDialog(false);
          setActiveTask(undefined);
        }}
      />
    </>
  );
};
