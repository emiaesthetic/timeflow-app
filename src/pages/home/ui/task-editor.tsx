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
        <header className="border-border/5 mb-6 border-b-1 border-solid pb-4">
          <h1 className="text-3xl font-bold">
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
        <footer className="flex items-center justify-center">
          <Button className="w-full" type="submit" form="taskForm">
            {task ? 'Update task' : 'Create Task'}
          </Button>
        </footer>
      }
      className="w-full max-w-144"
      id="taskFormLayout"
      aria-label="Task create/update form"
      canClose={true}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
