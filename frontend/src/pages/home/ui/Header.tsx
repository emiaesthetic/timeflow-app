import { AuthButton, UserProfile, authStore } from '@/features/auth';

import { CONFIG } from '@/shared/config';
import { Layout } from '@/shared/ui/Layout';
import { Link } from '@/shared/ui/Link';
import { LogoIcon } from '@/shared/ui/icons/Logo';

function Header() {
  const { isAuthenticated } = authStore();

  return (
    <header className="py-6">
      <Layout>
        <div className="border-muted flex items-center justify-between gap-x-8">
          <Link
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            to={CONFIG.ROUTES.HOME}
          >
            <LogoIcon className="size-9" />
          </Link>
          {isAuthenticated ? <UserProfile /> : <AuthButton />}
        </div>
      </Layout>
    </header>
  );
}

export { Header };
