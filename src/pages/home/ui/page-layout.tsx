import { Header } from './header';
import { TaskBoard } from './task-board';

export const PageLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-full min-h-screen">
      <Header />
      <main className="h-full">
        <h1 className="visually-hidden">TimeFlow App.</h1>
        <TaskBoard />
      </main>
    </div>
  );
};
