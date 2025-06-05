import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="py-4">
      <div className="max-w-300 mx-auto px-4">
        <div className="pb-4 border-b-1 border-solid border-[var(--border-muted)] flex justify-between items-center gap-x-8">
          <Logo />
          <Button onClick={() => navigate('/auth')}>Logout</Button>
        </div>
      </div>
    </header>
  );
};
