import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

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
            path: ROUTES.HOME,
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
            path: ROUTES.REGISTER,
            lazy: async () => {
              const { RegisterForm } = await import('@/features/auth');
              return { Component: RegisterForm };
            },
          },
          {
            path: ROUTES.LOGIN,
            lazy: async () => {
              const { LoginForm } = await import('@/features/auth');
              return { Component: LoginForm };
            },
          },
          {
            path: ROUTES.OAUTH,
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
