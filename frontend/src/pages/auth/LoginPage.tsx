import { LoginForm } from '@/features/auth';

import { AuthLayout } from './ui/AuthLayout';
import { VisualPanel } from './ui/VisualPanel';

function LoginPage() {
  return (
    <AuthLayout>
      <VisualPanel />
      <LoginForm />
    </AuthLayout>
  );
}

export { LoginPage };
