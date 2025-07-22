import { Button } from '@/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/Dialog';

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Task</DialogTitle>
          <DialogDescription className="text-base">
            Fill in the details for your new task.
          </DialogDescription>
        </DialogHeader>

        <TaskForm
          onSubmit={formData => {
            onSubmit(formData);
          }}
        />

        <DialogFooter>
          <Button className="w-full" type="submit" form="taskForm">
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
