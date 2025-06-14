import { Header } from './header';
import { TaskBoard } from './task-board';

export const PageLayout = () => {
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
