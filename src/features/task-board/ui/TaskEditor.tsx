import { Button } from '@/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/Dialog';

import {
  transformFormDateToTask,
  transformTaskToFormDate,
} from '../lib/transformTask';
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
  onSubmit: (task: Task) => void;
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
          onSubmit={(data: TaskFormData) => {
            onSubmit({ ...task, ...transformFormDateToTask(data) });
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
