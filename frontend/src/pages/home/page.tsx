import { TaskBoard } from '@/features/task-board';

import { Header } from './ui/Header';
import { Layout } from './ui/Layout';

export function HomePage() {
  return (
    <Layout header={<Header />}>
      <TaskBoard />
    </Layout>
  );
}
