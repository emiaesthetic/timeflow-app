import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm, authStore } from '@/features/auth';

import { CONFIG } from '@/shared/config';

import { AuthLayout } from './ui/AuthLayout';
import { VisualPanel } from './ui/VisualPanel';

function LoginPage() {
  const { isAuthenticated } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && window.location.pathname.includes('auth')) {
      navigate(CONFIG.ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout>
      <VisualPanel />
      <LoginForm />
    </AuthLayout>
  );
}

export { LoginPage };
