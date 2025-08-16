import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  authStore,
  useLoginWithGithubMutation,
  useLoginWithGoogleMutation,
} from '@/features/auth';

import { CONFIG } from '@/shared/config';

import { AuthLayout } from './ui/AuthLayout';

function OAuthPage() {
  const isAuthenticated = authStore(state => state.isAuthenticated);
  const { mutate: loginWithGithub } = useLoginWithGithubMutation();
  const { mutate: loginWithGoogle } = useLoginWithGoogleMutation();

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
      searchParams.delete('state');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, loginWithGithub, loginWithGoogle]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(CONFIG.ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout withCard={false}>
      <h1 className="text-center text-xl font-bold">
        Authorization processing...
      </h1>
    </AuthLayout>
  );
}

export { OAuthPage };
