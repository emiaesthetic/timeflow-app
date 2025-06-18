import { useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { PlusIcon } from '@/shared/ui/icons';

import { transformFormDateToTask } from './lib/transformTask';
import { useTimer } from './lib/useTimer';
import { useLocalStorage } from './model/useLocalStorage';
import { Task, TaskFormData } from './types';
import { TaskEditor } from './ui/TaskEditor';
import { TaskItem } from './ui/TaskItem';
import { TaskList } from './ui/TaskList';
import { TaskTimer } from './ui/TaskTimer';

export const TaskBoard = () => {
  const { tasks, addTask, editTask, removeTask } = useLocalStorage();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenTimer, setIsOpenTimer] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | undefined>();

  const { remainingTime, isEnabled, toggleTimer, resetTimer } = useTimer(
    activeTask?.duration || 0,
  );

  const handleSubmit = (data: TaskFormData) => {
    if (activeTask) {
      editTask({ ...activeTask, ...transformFormDateToTask(data) });
    } else {
      const taskWithID = {
        id: crypto.randomUUID(),
        ...transformFormDateToTask(data),
      } as Task;
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

          <TaskList
            tasks={tasks}
            renderTask={task => (
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
            )}
          />
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
