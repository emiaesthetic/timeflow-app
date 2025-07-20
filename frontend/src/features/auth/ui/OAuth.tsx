import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';

import { useAuth } from '../model/useAuth';

export function OAuth() {
  const { isLoading, isAuthenticated, error, loginWithGithub } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      loginWithGithub(code);

      searchParams.delete('code');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, loginWithGithub]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }

    if (error) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, error, navigate]);

  return <div>{isLoading && 'Authorization processing'}</div>;
}
