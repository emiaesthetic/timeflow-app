import { RegisterForm } from '@/features/auth';

import { AuthLayout } from './ui/AuthLayout';
import { VisualPanel } from './ui/VisualPanel';

function RegisterPage() {
  return (
    <AuthLayout>
      <VisualPanel />
      <RegisterForm />
    </AuthLayout>
  );
}

export { RegisterPage };
