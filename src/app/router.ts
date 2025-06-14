import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { App } from './app';
import { PrivateRoute } from './privateRoute';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.AUTH,
        lazy: async () => {
          const { AuthPage } = await import('./auth.page');
          return { Component: AuthPage };
        },
      },
      {
        Component: PrivateRoute,
        children: [
          {
            path: ROUTES.HOME,
            lazy: async () => {
              const { HomePage } = await import('@/pages/home');
              return { Component: HomePage };
            },
          },
        ],
      },
    ],
  },
]);
