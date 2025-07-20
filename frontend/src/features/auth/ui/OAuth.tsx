import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CONFIG } from '@/shared/config';

import { useAuth } from '../model/useAuth';

export function OAuth() {
  const { isAuthenticated, error, loginWithGithub, loginWithGoogle } =
    useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      if (state === 'github') {
        loginWithGithub(code);
      } else {
        loginWithGoogle(code);
      }

      searchParams.delete('code');
      searchParams.delete('provider');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, loginWithGithub, loginWithGoogle]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(CONFIG.ROUTES.HOME, { replace: true });
    }

    if (error) {
      navigate(CONFIG.ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <div className="flex h-full items-center justify-center">
      <h2 className="m-0 text-xl font-bold">Authorization processing...</h2>
    </div>
  );
}
