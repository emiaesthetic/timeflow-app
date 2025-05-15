import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { App } from './app';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.AUTH,
        lazy: () => import('@/pages/auth'),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import('@/pages/home'),
      },
    ],
  },
]);
