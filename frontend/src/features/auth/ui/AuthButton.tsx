import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/Button';

export function AuthButton() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(ROUTES.LOGIN)}>Sign In</Button>;
}
