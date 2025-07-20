import { createBrowserRouter } from 'react-router-dom';

import { CONFIG } from '@/shared/config';

import { App } from './App';
import { AuthLayout } from './ui/AuthLayout';
import { Layout } from './ui/Layout';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        Component: Layout,
        children: [
          {
            path: CONFIG.ROUTES.HOME,
            lazy: async () => {
              const { TaskBoard } = await import('@/features/task-board');
              return { Component: TaskBoard };
            },
          },
        ],
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: CONFIG.ROUTES.REGISTER,
            lazy: async () => {
              const { RegisterForm } = await import('@/features/auth');
              return { Component: RegisterForm };
            },
          },
          {
            path: CONFIG.ROUTES.LOGIN,
            lazy: async () => {
              const { LoginForm } = await import('@/features/auth');
              return { Component: LoginForm };
            },
          },
          {
            path: CONFIG.ROUTES.OAUTH,
            lazy: async () => {
              const { OAuth } = await import('@/features/auth');
              return { Component: OAuth };
            },
          },
        ],
      },
    ],
  },
]);
