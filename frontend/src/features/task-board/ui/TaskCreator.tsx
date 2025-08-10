import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';

import { TaskFormData } from '../model/types';

import { TaskForm } from './TaskForm';

export function TaskCreator({
  isOpen,
  toggleOpen,
  onSubmit,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  onSubmit: (formData: TaskFormData) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title className="text-2xl">Create New Task</Dialog.Title>
          <Dialog.Description className="text-base">
            Fill in the details for your new task.
          </Dialog.Description>
        </Dialog.Header>

        <TaskForm
          onSubmit={formData => {
            onSubmit(formData);
          }}
        />

        <Dialog.Footer>
          <Button className="w-full" type="submit" form="taskForm">
            Create Task
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
