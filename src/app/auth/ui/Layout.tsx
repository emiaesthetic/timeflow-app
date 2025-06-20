import { Button } from '@/shared/ui/Button';
import { GitHubIcon } from '@/shared/ui/icons';

import { useAuth } from '../lib/useAuth';

import { Preloader } from './Preloader';

export const Layout = () => {
  const { loading, redirectToAuth } = useAuth();

  if (loading) return <Preloader />;

  return (
    <div className="bg-background text-foreground grid min-h-screen w-full grid-rows-1">
      <main className="flex h-full items-center-safe justify-center p-4">
        <div className="text-center">
          <h1 className="mb-4 text-xl font-medium">Welcome to TimeFlow app</h1>
          <Button className="gap-4" onClick={redirectToAuth}>
            <GitHubIcon className="size-5" />
            <span>Continue with GitHub</span>
          </Button>
        </div>
      </main>
    </div>
  );
};
