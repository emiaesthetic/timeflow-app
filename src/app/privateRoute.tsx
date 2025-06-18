import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/auth';

import { ROUTES } from '@/shared/model/routes';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
