import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';

export function AuthButton() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate('/auth')}>Sign In</Button>;
}
