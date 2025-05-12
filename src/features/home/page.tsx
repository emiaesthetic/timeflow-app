import { Header } from './ui/header';
import { TaskBoard } from './ui/task-board';

import style from './page.module.scss';

const HomePage = () => {
  return (
    <div className={style.page}>
      <Header />

      <main className="content">
        <h1 className="visually-hidden">TimeFlow App.</h1>

        <TaskBoard />
      </main>
    </div>
  );
};

export const Component = HomePage;
