import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { App } from './app';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.AUTH,
        lazy: () => import('@/features/auth/page'),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import('@/features/home/page'),
      },
    ],
  },
]);
