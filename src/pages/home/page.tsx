import { Header } from './ui/header';
import { PageLayout } from './ui/page-layout';
import { TaskBoard } from './ui/task-board';

export const HomePage = () => {
  return <PageLayout header={<Header />} taskBoard={<TaskBoard />} />;
};
