import { Task, TaskFormData } from '@/shared/types/task';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';

import {
  transformFormDateToTask,
  transformTaskToFormDate,
} from './lib/transformTask';
import { useEditorContext } from './lib/useEditorContext';
import { Form } from './ui/Form';

export const Layout = ({
  addTask,
  editTask,
}: {
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
}) => {
  const { isOpen, currentTask, closeEditor } = useEditorContext();

  const handleSubmit = (data: TaskFormData) => {
    if (currentTask) {
      editTask({ ...currentTask, ...transformFormDateToTask(data) });
    } else {
      const taskWithID: Task = {
        id: crypto.randomUUID(),
        ...transformFormDateToTask(data),
      };
      addTask(taskWithID);
    }

    closeEditor();
  };

  return (
    <Dialog
      header={
        <header className="border-border/5 mb-6 border-b-1 border-solid pb-4">
          <h1 className="text-3xl font-bold">
            {currentTask ? 'Edit task' : 'Create New Task'}
          </h1>
        </header>
      }
      body={
        <Form
          key={currentTask ? currentTask.id : 'new'}
          defaultValues={
            currentTask ? transformTaskToFormDate(currentTask) : undefined
          }
          onSubmit={handleSubmit}
        />
      }
      footer={
        <footer className="flex items-center justify-center">
          <Button className="w-full" type="submit" form="taskForm">
            {currentTask ? 'Update task' : 'Create Task'}
          </Button>
        </footer>
      }
      className="w-full max-w-144"
      id="taskFormLayout"
      aria-label="Task create/update form"
      canClose={true}
      isOpen={isOpen}
      onClose={closeEditor}
    />
  );
};
