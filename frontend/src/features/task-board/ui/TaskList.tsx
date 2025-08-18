import { Task } from '../model/types';

import emptyImg from './img/empty.svg';

function TaskListSkeleton({
  taskItemSkeleton,
}: {
  taskItemSkeleton: React.ReactNode;
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-busy="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <li className="h-full" key={index}>
          {taskItemSkeleton}
        </li>
      ))}
    </ul>
  );
}

function TaskList({
  tasks,
  renderTask,
}: {
  tasks: Task[];
  renderTask: (task: Task) => React.ReactNode;
}) {
  return (
    <>
      {tasks.length === 0 ? (
        <div className="flex w-full items-center justify-center">
          <img
            className="w-[80%] max-w-[576px]"
            src={emptyImg}
            alt="To-do list is empty"
          />
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tasks.map(task => (
            <li className="h-full" key={task.id}>
              {renderTask(task)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export { TaskList, TaskListSkeleton };
