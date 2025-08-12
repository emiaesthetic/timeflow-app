import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';

import { useDialog } from './lib/useDialog';
import { Task, TaskFormData } from './model/types';
import { useCreateTaskMutation } from './model/useCreateTaskMutation';
import { useCurrentTask } from './model/useCurrentTask';
import { useDeleteTaskMutation } from './model/useDeleteTaskMutation';
import { useTasksMigration } from './model/useTasksMigration';
import { useTasksQuery } from './model/useTasksQuery';
import { useTimer } from './model/useTimer';
import { useUpdateTaskMutation } from './model/useUpdateTaskMutation';
import { Header } from './ui/Header';
import { TaskBoardLayout } from './ui/TaskBoardLayout';
import { TaskCreator } from './ui/TaskCreator';
import { TaskEditor } from './ui/TaskEditor';
import { TaskItem } from './ui/TaskItem';
import { TaskList } from './ui/TaskList';
import { TaskTimer } from './ui/TaskTimer';

export function TaskBoard() {
  const { tasks, isPending, isError, error } = useTasksQuery();
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  useTasksMigration();

  const { currentTask, selectCurrentTask, resetCurrentTask } = useCurrentTask();
  const creator = useDialog();
  const editor = useDialog();
  const timer = useTimer(currentTask?.duration);

  const handleCreatorSubmit = (formData: TaskFormData) => {
    createTaskMutation.mutate(formData);
    creator.close();
  };

  const handleOpenEditor = (task: Task) => {
    selectCurrentTask(task);
    editor.open();
  };

  const handleEditorOpenChange = (open: boolean) => {
    editor.toggle();
    if (!open) resetCurrentTask();
  };

  const handleEditorSubmit = (taskId: string, formData: TaskFormData) => {
    updateTaskMutation.mutate({ taskId, formData });
    editor.close();
  };

  const handleOpenTimer = (task: Task) => {
    selectCurrentTask(task);
    timer.open();
  };

  const handleTimerOpenChange = (open: boolean) => {
    timer.toggle();
    if (!open) resetCurrentTask();
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) {
    toast.error(getErrorMessage(error));
  }

  return (
    <TaskBoardLayout>
      <Header isEmpty={tasks.length === 0} onOpenCreator={creator.open} />

      <TaskList
        tasks={tasks}
        renderTask={task => (
          <>
            <TaskItem
              task={task}
              onOpenTimer={() => handleOpenTimer(task)}
              onOpenEditor={() => handleOpenEditor(task)}
              deleteTask={deleteTaskMutation.mutate}
            />
          </>
        )}
      />

      <TaskCreator
        isOpen={creator.isOpen}
        toggleOpen={creator.toggle}
        onSubmit={handleCreatorSubmit}
      />

      <TaskEditor
        task={currentTask}
        isOpen={editor.isOpen}
        onSubmit={handleEditorSubmit}
        onOpenChange={handleEditorOpenChange}
      />

      <TaskTimer
        task={currentTask}
        isOpen={timer.isOpen}
        isRunning={timer.isRunning}
        remainingTime={timer.remainingTime}
        toggleRunning={timer.toggleRunning}
        onOpenChange={handleTimerOpenChange}
        onStopTimer={timer.close}
      />
    </TaskBoardLayout>
  );
}
