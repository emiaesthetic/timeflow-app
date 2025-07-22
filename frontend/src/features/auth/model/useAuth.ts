import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CONFIG } from '@/shared/config';

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
      navigate(CONFIG.ROUTES.HOME, { replace: true });
    }
  }, [store.isAuthenticated, store.isLoading, navigate]);

  return {
    user: store.user,
    isLoading: store.isLoading,
    isAuthenticated: store.isAuthenticated,
    hasMigrated: store.hasMigrated,
    error: store.error,
    setHasMigrated: store.setHasMigrated,
    initializeSession: store.initializeSession,
    registerAccount: store.register,
    loginAccount: store.login,
    loginWithGithub: store.loginWithGithub,
    loginWithGoogle: store.loginWithGoogle,
    logoutAccount: store.logout,
  };
};
