import { toast } from 'sonner';

import { getErrorMessage } from '@/shared/api';
import { useSkeleton } from '@/shared/lib/useSkeleton';

import { transformTaskToFormData } from './lib/transformTask';
import { useDialog } from './lib/useDialog';
import { Task, TaskFormData } from './model/types';
import { useCreateTaskMutation } from './model/useCreateTaskMutation';
import { useCurrentTask } from './model/useCurrentTask';
import { useDeleteTaskMutation } from './model/useDeleteTaskMutation';
import { useTasksFilter } from './model/useTasksFilter';
import { useTasksMigration } from './model/useTasksMigration';
import { useTasksQuery } from './model/useTasksQuery';
import { useTimer } from './model/useTimer';
import { useUpdateTaskMutation } from './model/useUpdateTaskMutation';
import { Header } from './ui/Header';
import { TaskBoardLayout } from './ui/TaskBoardLayout';
import { TaskCreator } from './ui/TaskCreator';
import { TaskEditor } from './ui/TaskEditor';
import { TaskItem, TaskItemSkeleton } from './ui/TaskItem';
import { TaskList, TaskListSkeleton } from './ui/TaskList';
import { TaskTimer } from './ui/TaskTimer';

export function TaskBoard() {
  const { tasks, isPending, isError, error } = useTasksQuery();
  const { filteredTasks, handleChangeFilter } = useTasksFilter(tasks);
  const { currentTask, selectCurrentTask, resetCurrentTask } = useCurrentTask();

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  useTasksMigration();

  const creatorDialog = useDialog();
  const editorDialog = useDialog();
  const timerDialog = useDialog();
  const timerLogic = useTimer();

  const { isShowSkeleton } = useSkeleton({ isPending });

  const handleCreatorSubmit = (formData: TaskFormData) => {
    createTaskMutation.mutate(formData);
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
    updateTaskMutation.mutate({ taskId, formData });
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
    const formData = transformTaskToFormData(task);
    updateTaskMutation.mutate({
      taskId: task.id,
      formData: {
        ...formData,
        status: formData.status === 'PROCESS' ? 'DONE' : 'PROCESS',
      },
    });
  };

  if (isError) {
    toast.error(getErrorMessage(error));
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
