export const queryKeys = {
  tasks: (isAuthenticated: boolean) => ['tasks', isAuthenticated] as const,
  user: () => ['users', 'me'] as const,
};
