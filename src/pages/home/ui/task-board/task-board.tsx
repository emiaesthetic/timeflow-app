import { useRef, useState } from 'react';
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

import { TASKS } from '../../constants';
import { ITask } from '../../types';
import { TaskForm } from '../task-form';

import styleBoard from './task-board.module.scss';
import styleItem from './task-item.module.scss';

export const TaskItem = ({
  title,
  description,
  date,
  time,
  duration,
  priority,
}: ITask) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

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
            <time className={styleItem.task__date} dateTime="2025-09-10">
              {date},
            </time>
            <time className={styleItem.task__time} dateTime="06:40">
              {time}
            </time>
          </div>

          <data className={styleItem.task__duration} value="PT30M">
            {duration}
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
            <Button variant="icon">
              <EditIcon width="32" height="32" />
            </Button>
          </li>
          <li className={styleItem['task__actions-item']}>
            <Button variant="icon">
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
            { label: 'Start', icon: <PlayIcon width="20" height="20" /> },
            { label: 'Edit', icon: <EditIcon width="20" height="20" /> },
            { label: 'Delete', icon: <CrossIcon width="20" height="20" /> },
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
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className={styleBoard['task-board']}>
        <Layout>
          <header className={styleBoard['task-board__header']}>
            <h2 className={styleBoard['task-board__title']}>Task List</h2>
            <Button
              variant="dark"
              onClick={() => dialogRef.current?.showModal()}
            >
              <PlusIcon width="24" height="24" aria-hidden="true" />
              Add new task
            </Button>
          </header>

          <ul className={styleBoard['task-board__list']}>
            {TASKS.map((task, index) => (
              <li className={styleBoard['task-board__item']}>
                <TaskItem key={index} {...task} />
              </li>
            ))}
          </ul>
        </Layout>
      </section>

      <Dialog
        ref={dialogRef}
        dialogTitle={<h1 className="create-task__title">Create New Task</h1>}
        dialogContent={<TaskForm />}
        dialogFooter={
          <Button variant="dark" type="submit" form="taskForm" fullWidth>
            Create Task
          </Button>
        }
        id="createTask"
        aria-label="Task creation form"
        onClose={() => dialogRef.current?.close()}
      />
    </>
  );
};
