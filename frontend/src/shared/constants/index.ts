const TASKS = 'tasks';

export const queryKeys = {
  tasks: (isAuthenticated: boolean) => [TASKS, isAuthenticated] as const,
};
