import { tasksApiRemote } from '../api/taskApiRemote';
import { tasksApiStorage } from '../api/taskApiStorage';

import { TasksApiContext } from './TasksApiContext';

export const TasksApiProvider = ({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) => {
  const api = isAuthenticated ? tasksApiRemote : tasksApiStorage;

  return (
    <TasksApiContext.Provider value={{ isAuthenticated, api }}>
      {children}
    </TasksApiContext.Provider>
  );
};
