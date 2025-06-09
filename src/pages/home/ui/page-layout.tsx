import { Header } from './header';
import { TaskBoard } from './task-board';

export const PageLayout = () => {
  return (
    <div className="grid h-full min-h-screen grid-rows-[auto_1fr]">
      <Header />
      <main className="h-full">
        <h1 className="visually-hidden">TimeFlow App.</h1>
        <TaskBoard />
      </main>
    </div>
  );
};
