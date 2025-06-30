import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/auth';

import { Button } from '@/shared/ui/Button';

export function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="py-4">
      <div className="mx-auto max-w-300 px-4">
        <div className="border-muted flex items-center justify-end gap-x-8 border-b-1 border-solid pb-4">
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
}
