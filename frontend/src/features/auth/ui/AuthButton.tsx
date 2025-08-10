import { LogInIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CONFIG } from '@/shared/config';
import { Button } from '@/shared/ui/Button';

export function AuthButton() {
  const navigate = useNavigate();

  return (
    <Button
      className="size-10"
      onClick={() => navigate(CONFIG.ROUTES.LOGIN)}
      aria-label="Log in to your account"
    >
      <LogInIcon className="size-6" />
    </Button>
  );
}
