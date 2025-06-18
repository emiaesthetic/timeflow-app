import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { App } from './App';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.AUTH,
        lazy: async () => {
          const { AuthPage } = await import('./auth/Auth.page');
          return { Component: AuthPage };
        },
      },
      {
        Component: PrivateRoute,
        children: [
          {
            path: ROUTES.HOME,
            lazy: async () => {
              const { HomePage } = await import('./home/Home.page');
              return { Component: HomePage };
            },
          },
        ],
      },
    ],
  },
]);
