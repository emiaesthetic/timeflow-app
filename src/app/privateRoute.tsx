import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';

import { ROUTES } from '@/shared/model/routes';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
