import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { GITHUB_AUTH_URL } from '../config';
import { useStore } from '../model/useStore';

export const useAuth = () => {
  const { isAuthenticated, loading, error, login, logout, initializeSession } =
    useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleAuthCallback = useCallback(async () => {
    const code = searchParams.get('code');

    if (!code) return;

    searchParams.delete('code');
    setSearchParams(searchParams);

    await login(code);

    return;
  }, [searchParams, setSearchParams, login]);

  useEffect(() => {
    if (loading) return;

    handleAuthCallback();

    if (isAuthenticated && window.location.pathname === ROUTES.AUTH) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [loading, isAuthenticated, navigate, handleAuthCallback]);

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
