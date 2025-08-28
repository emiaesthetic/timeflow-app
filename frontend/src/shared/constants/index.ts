export const queryKeys = {
  tasks: (isAuthenticated = false) => ['tasks', isAuthenticated] as const,
  user: () => ['users', 'me'] as const,
};
