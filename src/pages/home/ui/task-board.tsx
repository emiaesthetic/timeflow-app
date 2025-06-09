import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/ui/icons';

import { transformFormDateToTask } from '../lib/transform-task';
import { ITask, ITaskFormData } from '../model/types';
import { useLocalStorage } from '../model/use-local-storage';
import { useTimer } from '../model/use-timer';
import emptyImg from './img/empty.svg';
import { TaskEditor } from './task-editor';
import { TaskItem } from './task-item';
import { TaskTimer } from './task-timer';

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
      <section className="py-4">
        <div className="mx-auto max-w-300 px-4">
          <header className="mb-8 flex items-center justify-between gap-x-8">
            <h2 className="text-4xl font-bold">Task List</h2>
            <Button onClick={() => setIsOpenForm(true)}>
              <PlusIcon className="size-6" aria-hidden="true" />
              Add new task
            </Button>
          </header>

          {tasks.length === 0 ? (
            <div className="flex w-full content-center">
              <img className="w-1/2" src={emptyImg} alt="To-do list is empty" />
            </div>
          ) : (
            <ul>
              {tasks.map(task => (
                <li key={task.id} className="[&:not(:last-child)]:mb-6">
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
        </div>
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
