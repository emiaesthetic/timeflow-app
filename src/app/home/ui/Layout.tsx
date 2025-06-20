import { Header } from './Header';
import { TaskBoard, useTasks } from '@/modules/task-board';
import { TaskEditor, useOpenEditor } from '@/modules/task-editor';
import { TaskTimer, useOpenTimer } from '@/modules/task-timer';

export const Layout = () => {
  const { tasks, addTask, editTask, removeTask } = useTasks();
  const { openForCreate, openForEdit } = useOpenEditor();
  const { startTimer } = useOpenTimer();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <Header />
      <main className="h-full">
        <h1 className="sr-only">TimeFlow App.</h1>
        <TaskBoard
          tasks={tasks}
          onCreate={openForCreate}
          onEdit={task => openForEdit(task)}
          onStartTimer={task => startTimer(task)}
          onRemoveTask={(taskID: string) => removeTask(taskID)}
        />
      </main>

      <TaskEditor addTask={addTask} editTask={editTask} />
      <TaskTimer />
    </div>
  );
};
