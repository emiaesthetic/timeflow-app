import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import { ArrowLeftIcon, GitHubIcon } from '@/shared/ui/icons';
import { Link } from '@/shared/ui/link';

import { GITHUB_AUTH_URL } from './constants';

export const PageLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = () => {
    window.location.href = GITHUB_AUTH_URL;
  };

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="bg-background text-foreground grid min-h-screen w-full grid-rows-[auto_1fr]">
      <header className="p-4">
        <Link to={ROUTES.HOME}>
          <ArrowLeftIcon className="size-4" />
          <span>Back to task</span>
        </Link>
      </header>

      <main className="flex h-full items-center-safe justify-center p-4">
        <div className="text-center">
          <h1 className="mb-4 text-xl font-medium">Welcome to TimeFlow app</h1>
          <Button className="gap-4" onClick={handleLogin}>
            <GitHubIcon className="size-5" />
            <span>Continue with GitHub</span>
          </Button>
        </div>
      </main>
    </div>
  );
};
