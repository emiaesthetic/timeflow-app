import { Task } from '@/shared/types/task';

import { Header } from './ui/Header';
import { TaskItem } from './ui/TaskItem';
import { TaskList } from './ui/TaskList';

export const Layout = ({
  tasks,
  onCreate,
  onEdit,
  onStartTimer,
  onRemoveTask,
}: {
  tasks: Task[];
  onCreate: () => void;
  onEdit: (task: Task) => void;
  onStartTimer: (task: Task) => void;
  onRemoveTask: (id: string) => void;
}) => {
  return (
    <>
      <section className="py-4">
        <div className="mx-auto max-w-300 px-4">
          <Header onOpen={onCreate} />

          <TaskList
            tasks={tasks}
            renderTask={task => (
              <TaskItem
                {...task}
                onStart={() => onStartTimer(task)}
                onEdit={() => onEdit(task)}
                onRemove={() => onRemoveTask(task.id)}
              />
            )}
          />
        </div>
      </section>
    </>
  );
};
