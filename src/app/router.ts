import { createBrowserRouter, redirect } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { App } from './app';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.AUTH,
        lazy: () => import('@/features/auth/auth.page'),
      },
      {
        path: ROUTES.TASK_BOARD,
        lazy: () => import('@/features/task-board/task-board.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TASK_BOARD),
      },
    ],
  },
]);
