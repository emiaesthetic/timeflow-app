import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';

import { transformTaskToFormDate } from '../lib/transform-task';
import { ITask, ITaskFormData } from '../model/types';
import { TaskForm } from './task-form';

import style from './task-editor.module.scss';

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
        <header className={style.header}>
          <h1 className={style.header__title}>
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
        <footer className={style.footer}>
          <Button variant="dark" type="submit" form="taskForm" fullWidth>
            {task ? 'Update task' : 'Create Task'}
          </Button>
        </footer>
      }
      className="task-form"
      id="taskFormLayout"
      aria-label="Task create/update form"
      canClose={true}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
