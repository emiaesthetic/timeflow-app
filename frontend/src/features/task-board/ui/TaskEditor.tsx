import { Button } from '@/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/Dialog';

import { transformTaskToFormDate } from '../lib/transformTask';
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit task</DialogTitle>
          <DialogDescription className="text-base">
            Edit details of your task.
          </DialogDescription>
        </DialogHeader>

        <TaskForm
          key={task.id}
          currentTask={transformTaskToFormDate(task)}
          onSubmit={formData => {
            onSubmit(task.id, formData);
          }}
        />

        <DialogFooter>
          <Button className="w-full" type="submit" form="taskForm">
            Update task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
