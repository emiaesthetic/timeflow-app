import { useNavigate } from 'react-router-dom';

import { CONFIG } from '@/shared/config';
import { Button } from '@/shared/ui/Button';

export function AuthButton() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(CONFIG.ROUTES.LOGIN)}>Sign In</Button>;
}
