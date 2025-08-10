import { createBrowserRouter } from 'react-router-dom';

import { CONFIG } from '@/shared/config';

import { App } from './App';

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: CONFIG.ROUTES.HOME,
        lazy: async () => {
          const { HomePage } = await import('@/pages/home');
          return { Component: HomePage };
        },
      },
      {
        path: CONFIG.ROUTES.REGISTER,
        lazy: async () => {
          const { RegisterPage } = await import('@/pages/auth');
          return { Component: RegisterPage };
        },
      },
      {
        path: CONFIG.ROUTES.LOGIN,
        lazy: async () => {
          const { LoginPage } = await import('@/pages/auth');
          return { Component: LoginPage };
        },
      },
      {
        path: CONFIG.ROUTES.OAUTH,
        lazy: async () => {
          const { OAuthPage } = await import('@/pages/auth');
          return { Component: OAuthPage };
        },
      },
    ],
  },
]);
