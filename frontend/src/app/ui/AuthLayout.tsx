import { ArrowLeftIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

import { CONFIG } from '@/shared/config';
import { buttonVariants } from '@/shared/ui/Button';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <header className="p-4">
        <Link className={buttonVariants()} to={CONFIG.ROUTES.HOME}>
          <ArrowLeftIcon />
          Back
        </Link>
      </header>

      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}
