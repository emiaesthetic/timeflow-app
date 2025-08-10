import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { CONFIG } from '@/shared/config';

import { AuthLayout } from './ui/AuthLayout';

function OAuthPage() {
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
    <AuthLayout withCard={false}>
      <h1 className="text-center text-xl font-bold">
        Authorization processing...
      </h1>
    </AuthLayout>
  );
}

export { OAuthPage };
