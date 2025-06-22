import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/auth';

import { Button } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="py-4">
      <div className="mx-auto max-w-300 px-4">
        <div className="border-muted flex items-center justify-between gap-x-8 border-b-1 border-solid pb-4">
          <Logo />
          <Button
            onClick={() => {
              logout();
              navigate('/auth');
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
