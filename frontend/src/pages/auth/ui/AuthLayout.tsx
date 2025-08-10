import { Background } from '@/shared/ui/Background';
import { Layout } from '@/shared/ui/Layout';

interface AuthLayoutProps extends React.PropsWithChildren {
  withCard?: boolean;
}

function AuthLayout({ children, withCard = true }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen place-items-center py-6">
      <Background />
      <Layout>
        {withCard ? (
          <div className="bg-background/15 mx-auto flex max-w-94 gap-x-5 rounded-xl p-2 shadow-lg backdrop-blur-md md:w-full md:max-w-none">
            {children}
          </div>
        ) : (
          children
        )}
      </Layout>
    </main>
  );
}

export { AuthLayout };
