import { useMemo, useState } from 'react';

import { Task } from '@/entities/task';

import { dateApi } from '../lib/dateApi';

export type FilterState =
  | 'ALL'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'PROCESS'
  | 'DONE';

function filterTasks(tasks: Task[], filter: FilterState) {
  const today = new Date();
  const currentTasks = tasks.filter(task =>
    dateApi.isSameDay(task.date, today),
  );

  if (filter === 'ALL') {
    return currentTasks;
  }

  if (filter === 'PROCESS' || filter === 'DONE') {
    return currentTasks.filter(task => task.status === filter);
  }

  return currentTasks.filter(task => task.priority === filter);
}

export function useTasksFilter(tasks: Task[]) {
  const [currentFilter, setCurrentFilter] = useState<FilterState>('ALL');

  const handleChangeFilter = (value: FilterState) => {
    setCurrentFilter(value);
  };

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, currentFilter);
  }, [tasks, currentFilter]);

  return { filteredTasks, handleChangeFilter };
}
