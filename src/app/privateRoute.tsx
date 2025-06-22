import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/app/auth';

import { ROUTES } from '@/shared/model/routes';

export const PrivateRoute = () => {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.AUTH} state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};
