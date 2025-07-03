import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { App } from './App';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.HOME,
        lazy: async () => {
          const { HomePage } = await import('@/pages/home');
          return { Component: HomePage };
        },
      },
      {
        path: ROUTES.AUTH,
        lazy: async () => {
          const { AuthPage } = await import('@/pages/auth');
          return { Component: AuthPage };
        },
      },
    ],
  },
]);
