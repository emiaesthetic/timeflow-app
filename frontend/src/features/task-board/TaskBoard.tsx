import { toast } from 'sonner';

import { useTasksQuery } from '@/entities/task';
import { Task } from '@/entities/task';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTasksMigration,
  useUpdateTaskMutation,
} from '@/entities/task';

import { getErrorMessage } from '@/shared/api';
import { useSkeleton } from '@/shared/lib/useSkeleton';

import { mapFormDataToPayload } from './lib/taskMappers';
import { useDialog } from './lib/useDialog';
import { TaskFormData } from './model/types';
import { useCurrentTask } from './model/useCurrentTask';
import { useTasksFilter } from './model/useTasksFilter';
import { useTimer } from './model/useTimer';
import { Header } from './ui/Header';
import { TaskBoardLayout } from './ui/TaskBoardLayout';
import { TaskCreator } from './ui/TaskCreator';
import { TaskEditor } from './ui/TaskEditor';
import { TaskItem, TaskItemSkeleton } from './ui/TaskItem';
import { TaskList, TaskListSkeleton } from './ui/TaskList';
import { TaskTimer } from './ui/TaskTimer';

export function TaskBoard() {
  const { tasks, isPending, error: tasksQueryError } = useTasksQuery();
  const { filteredTasks, handleChangeFilter } = useTasksFilter(tasks);
  const { currentTask, selectCurrentTask, resetCurrentTask } = useCurrentTask();

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const migrationMutation = useTasksMigration();

  const taskBoardError =
    tasksQueryError ||
    createTaskMutation.error ||
    updateTaskMutation.error ||
    deleteTaskMutation.error ||
    migrationMutation.error;

  const creatorDialog = useDialog();
  const editorDialog = useDialog();
  const timerDialog = useDialog();
  const timerLogic = useTimer();

  const { isShowSkeleton } = useSkeleton({ isPending });

  const handleCreatorSubmit = (formData: TaskFormData) => {
    const payload = mapFormDataToPayload(formData);
    createTaskMutation.mutate(payload);
    creatorDialog.close();
  };

  const handleOpenEditor = (task: Task) => {
    selectCurrentTask(task);
    editorDialog.open();
  };

  const handleEditorOpenChange = (open: boolean) => {
    editorDialog.toggle();
    if (!open) resetCurrentTask();
  };

  const handleEditorSubmit = (taskId: string, formData: TaskFormData) => {
    const payload = mapFormDataToPayload(formData);
    updateTaskMutation.mutate({ taskId, payload });
    editorDialog.close();
  };

  const handleOpenTimer = (task: Task) => {
    selectCurrentTask(task);
    timerDialog.open();
    timerLogic.start();
  };

  const handleTimerOpenChange = (open: boolean) => {
    timerDialog.toggle();
    if (!open) {
      resetCurrentTask();
      timerLogic.reset();
    }
  };

  const handleUpdateStatus = (task: Task) => {
    updateTaskMutation.mutate({
      taskId: task.id,
      payload: {
        ...task,
        status: task.status === 'PROCESS' ? 'DONE' : 'PROCESS',
      },
    });
  };

  if (taskBoardError) {
    toast.error(getErrorMessage(taskBoardError));
  }

  return (
    <TaskBoardLayout>
      <Header
        onChangeFilter={handleChangeFilter}
        onOpenCreator={creatorDialog.open}
      />

      {isShowSkeleton ? (
        <TaskListSkeleton taskItemSkeleton={<TaskItemSkeleton />} />
      ) : (
        <TaskList
          tasks={filteredTasks}
          renderTask={task => (
            <>
              <TaskItem
                task={task}
                onUpdateStatus={() => handleUpdateStatus(task)}
                onOpenTimer={() => handleOpenTimer(task)}
                onOpenEditor={() => handleOpenEditor(task)}
                deleteTask={deleteTaskMutation.mutate}
              />
            </>
          )}
        />
      )}

      <TaskCreator
        isOpen={creatorDialog.isOpen}
        toggleOpen={creatorDialog.toggle}
        onSubmit={handleCreatorSubmit}
      />

      <TaskEditor
        task={currentTask}
        isOpen={editorDialog.isOpen}
        onSubmit={handleEditorSubmit}
        onOpenChange={handleEditorOpenChange}
      />

      <TaskTimer
        task={currentTask}
        isOpen={timerDialog.isOpen}
        status={timerLogic.status}
        elapsedTime={timerLogic.elapsedTime}
        onStartTimer={timerLogic.start}
        onPauseTimer={timerLogic.pause}
        onOpenChange={handleTimerOpenChange}
      />
    </TaskBoardLayout>
  );
}
