import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/features/header';
import { ROUTES } from '@/shared/model/routes';

export const App = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === ROUTES.AUTH;

  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
    </>
  );
};
