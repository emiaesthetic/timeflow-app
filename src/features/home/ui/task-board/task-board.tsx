import { Button } from '@/shared/ui/button';
import { Layout } from '@/shared/ui/layout';

import { TaskItem } from './ui/task-item';

import PlusIcon from './img/plus.svg?react';

import style from './task-board.module.scss';

export interface ITask {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  priority: string;
}

const tasks: ITask[] = [
  {
    title: 'A lifelong goal: to love Darina',
    description:
      'To give her maximum time, to kiss her, to hug her, to make her happy.',
    date: 'All my life',
    time: '06:40 AM',
    duration: 'every minute.',
    priority: 'high',
  },
  {
    title: 'English: lesson and serial.',
    description:
      'Take an English to Automatic class and watch Vikings Episode 2.',
    date: 'May 7th',
    time: '7:40 AM',
    duration: '50 minutes',
    priority: 'low',
  },
  {
    title: 'React: YouTube course.',
    description:
      'Check out some tutorials on React 18. Read 3 points of documentation.',
    date: 'June 17th',
    time: '9:40 AM',
    duration: '90 minutes',
    priority: 'medium',
  },
  {
    title: 'TimeFlow app: design.',
    description:
      "Set up a task page. Simple and fast. Don't waste time on animations.",
    date: 'September 10th',
    time: '3:30 PM',
    duration: '30 minutes',
    priority: 'high',
  },
];

export const TaskBoard = () => {
  return (
    <section className={style['task-board']}>
      <Layout>
        <header className={style['task-board__header']}>
          <h2 className={style['task-board__title']}>Task List</h2>
          <Button variant="primary">
            <PlusIcon width="24" height="24" aria-hidden="true" />
            Add new task
          </Button>
        </header>

        <ul className={style['task-board__list']}>
          {tasks.map((task, index) => (
            <li className={style['task-board__item']}>
              <TaskItem key={index} {...task} />
            </li>
          ))}
        </ul>
      </Layout>
    </section>
  );
};
