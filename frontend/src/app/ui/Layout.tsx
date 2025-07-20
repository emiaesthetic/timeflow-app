import { Link, Outlet } from 'react-router-dom';

import { AuthButton, useAuth } from '@/features/auth';
import { UserProfile } from '@/features/auth';

import { ROUTES } from '@/shared/model/routes';

export function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <header className="py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="border-muted flex items-center justify-between gap-x-8 border-b-1 border-solid pb-4">
            <Link className="flex items-center gap-x-1" to={ROUTES.HOME}>
              <img className="size-10" src="/favicon.svg" alt="Logo" />
              <span className="text-2xl font-medium">Timeflow</span>
            </Link>
            {isAuthenticated ? <UserProfile /> : <AuthButton />}
          </div>
        </div>
      </header>

      <main className="h-full">
        <h1 className="sr-only">TimeFlow App.</h1>
        <Outlet />
      </main>
    </div>
  );
}
