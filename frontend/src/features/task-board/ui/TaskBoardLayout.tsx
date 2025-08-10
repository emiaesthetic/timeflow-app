import { Layout } from '@/shared/ui/Layout';

function TaskBoardLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="py-6">
      <Layout>{children}</Layout>
    </section>
  );
}

export { TaskBoardLayout };
