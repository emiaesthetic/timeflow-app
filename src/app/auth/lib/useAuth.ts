import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { GITHUB_AUTH_URL } from '../config';
import { useAuthStore } from '../model/store';

export const useAuth = () => {
  const { isAuthenticated, loading, error, login, logout, initializeSession } =
    useAuthStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    searchParams.delete('code');
    setSearchParams(searchParams);

    const handleAuthCallback = async () => {
      if (isAuthenticated) {
        return navigate(ROUTES.HOME, { replace: true });
      }

      if (!code) return;

      const isLogin = await login(code);

      if (isLogin) {
        return navigate(ROUTES.HOME);
      } else {
        return navigate(ROUTES.AUTH);
      }
    };

    handleAuthCallback();
  }, [isAuthenticated, searchParams, setSearchParams, login, navigate]);

  const redirectToAuth = () => {
    window.location.href = GITHUB_AUTH_URL;
  };

  return {
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    redirectToAuth,
    initializeSession,
  };
};
