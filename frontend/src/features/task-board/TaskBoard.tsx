import { useDialog } from './lib/useDialog';
import { Task, TaskFormData } from './model/types';
import { useCurrentTask } from './model/useCurrentTask';
import { useTasks } from './model/useTasks';
import { useTimer } from './model/useTimer';
import { Header } from './ui/Header';
import { Layout } from './ui/Layout';
import { TaskCreator } from './ui/TaskCreator';
import { TaskEditor } from './ui/TaskEditor';
import { TaskItem } from './ui/TaskItem';
import { TaskList } from './ui/TaskList';
import { TaskTimer } from './ui/TaskTimer';

export function TaskBoard() {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const { currentTask, selectCurrentTask, resetCurrentTask } = useCurrentTask();
  const creator = useDialog();
  const editor = useDialog();
  const timer = useTimer(currentTask?.duration);

  const handleOpenTimer = (task: Task) => {
    selectCurrentTask(task);
    timer.open();
  };

  const handleTimerOpenChange = (open: boolean) => {
    timer.toggle();
    if (!open) resetCurrentTask();
  };

  const handleCreatorSubmit = (formData: TaskFormData) => {
    createTask(formData);
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
    updateTask(taskId, formData);
    editor.close();
  };

  return (
    <Layout>
      <Header onOpenCreator={creator.open} />

      <TaskList
        tasks={tasks}
        renderTask={task => (
          <>
            <TaskItem
              task={task}
              onOpenTimer={() => handleOpenTimer(task)}
              onOpenEditor={() => handleOpenEditor(task)}
              deleteTask={deleteTask}
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
    </Layout>
  );
}
