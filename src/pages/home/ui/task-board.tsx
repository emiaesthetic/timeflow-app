import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/ui/icons';
import { Layout } from '@/shared/ui/layout';

import { transformFormDateToTask } from '../lib/transform-task';
import { ITask, ITaskFormData } from '../model/types';
import { useLocalStorage } from '../model/use-local-storage';
import { useTimer } from '../model/use-timer';
import { TaskEditor } from './task-editor';
import { TaskItem } from './task-item';
import { TaskTimer } from './task-timer';

import EmptyIcon from './img/empty.svg?react';

import styleBoard from './task-board.module.scss';

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
    setActiveTask(undefined);
    setIsOpenTimer(false);
    resetTimer();
  };

  return (
    <>
      <section className={styleBoard['task-board']}>
        <Layout>
          <header className={styleBoard['task-board__header']}>
            <h2 className={styleBoard['task-board__title']}>Task List</h2>
            <Button onClick={() => setIsOpenForm(true)}>
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

      <TaskEditor
        task={activeTask}
        isOpen={isOpenForm}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />

      {activeTask && (
        <TaskTimer
          task={activeTask}
          isOpen={isOpenTimer}
          isEnabled={isEnabled}
          remainingTime={remainingTime}
          onToggle={toggleTimer}
          onClose={closeTimer}
        />
      )}
    </>
  );
};
