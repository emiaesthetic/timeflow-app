import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { authStore } from './authStore';

export const useAuth = () => {
  const store = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      store.isAuthenticated &&
      !store.isLoading &&
      window.location.pathname.includes('auth')
    ) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [store.isAuthenticated, store.isLoading, navigate]);

  const logoutAccount = () => {
    store.logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return {
    user: store.user,
    isLoading: store.isLoading,
    isAuthenticated: store.isAuthenticated,
    error: store.error,
    initializeSession: store.initializeSession,
    registerAccount: store.register,
    loginAccount: store.login,
    loginWithGithub: store.loginWithGithub,
    logoutAccount,
  };
};
