import { TaskBoard } from '@/features/task-board';

import { Header } from './ui/Header';
import { HomeLayout } from './ui/HomeLayout';

function HomePage() {
  return <HomeLayout header={<Header />} taskBoard={<TaskBoard />} />;
}

export { HomePage };
