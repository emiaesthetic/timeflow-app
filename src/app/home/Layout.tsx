import { Header } from './Header';
import { TaskBoard } from '@/modules/task-board';

export const HomePageLayout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <Header />
      <main className="h-full">
        <h1 className="sr-only">TimeFlow App.</h1>
        <TaskBoard />
      </main>
    </div>
  );
};
