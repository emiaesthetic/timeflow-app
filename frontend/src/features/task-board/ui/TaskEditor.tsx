import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';

import { transformTaskToFormData } from '../lib/transformTask';
import { Task, TaskFormData } from '../model/types';

import { TaskForm } from './TaskForm';

export function TaskEditor({
  isOpen,
  task,
  onOpenChange,
  onSubmit,
}: {
  isOpen: boolean;
  task: Task | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (taskId: string, formData: TaskFormData) => void;
}) {
  if (!task) return;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title className="text-2xl">Edit task</Dialog.Title>
          <Dialog.Description className="text-base">
            Edit details of your task.
          </Dialog.Description>
        </Dialog.Header>

        <TaskForm
          key={task.id}
          currentTask={transformTaskToFormData(task)}
          onSubmit={formData => {
            onSubmit(task.id, formData);
          }}
        />

        <Dialog.Footer>
          <Button className="w-full" type="submit" form="taskForm">
            Update task
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
