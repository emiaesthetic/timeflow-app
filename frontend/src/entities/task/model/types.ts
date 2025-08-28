export type PRIORITY = 'LOW' | 'MEDIUM' | 'HIGH';

export type STATUS = 'PROCESS' | 'DONE';

export type TaskId = string;

export type Task = {
  id: TaskId;
  title: string;
  description?: string;
  date: Date;
  duration: number;
  priority: PRIORITY;
  status: STATUS;
};

export type TaskResponse = {
  id: TaskId;
  title: string;
  description?: string;
  date: string;
  duration: number;
  priority: PRIORITY;
  status: STATUS;
};

export type TasksApi = {
  fetchTasks: () => Promise<Task[]>;
  createTask: (payload: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (taskId: TaskId, payload: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: TaskId) => Promise<void>;
};
