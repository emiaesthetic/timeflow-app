import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';

import { transformTaskToFormDate } from '../lib/transform-task';
import { ITask, ITaskFormData } from '../model/types';
import { TaskForm } from './task-form';

interface ITaskEditorProps {
  task?: ITask;
  isOpen: boolean;
  onSubmit: (data: ITaskFormData) => void;
  onClose: () => void;
}

export const TaskEditor = ({
  task,
  isOpen,
  onSubmit,
  onClose,
}: ITaskEditorProps) => {
  return (
    <Dialog
      header={
        <header className="mb-6 pb-4 border-b-1 border-solid border-[var(--border-muted)]">
          <h1 className="font-bold text-3xl">
            {task ? 'Edit task' : 'Create New Task'}
          </h1>
        </header>
      }
      body={
        <TaskForm
          key={task ? task.id : 'new'}
          defaultValues={task ? transformTaskToFormDate(task) : undefined}
          onSubmit={onSubmit}
        />
      }
      footer={
        <footer className="flex justify-center items-center">
          <Button className="w-full" type="submit" form="taskForm">
            {task ? 'Update task' : 'Create Task'}
          </Button>
        </footer>
      }
      className="max-w-144 w-full"
      id="taskFormLayout"
      aria-label="Task create/update form"
      canClose={true}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
