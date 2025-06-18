import { Task } from '../types';

import emptyImg from './img/empty.svg';

export const TaskList = ({
  tasks,
  renderTask,
}: {
  tasks: Task[];
  renderTask: (task: Task) => React.ReactNode;
}) => {
  return (
    <>
      {tasks.length === 0 ? (
        <div className="flex w-full items-center justify-center">
          <img className="w-1/2" src={emptyImg} alt="To-do list is empty" />
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task.id}>{renderTask(task)}</li>
          ))}
        </ul>
      )}
    </>
  );
};
