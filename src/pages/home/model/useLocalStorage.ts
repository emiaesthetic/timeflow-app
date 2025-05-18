import { useEffect, useState } from 'react';

import { ITask } from './types';

const STORAGE_KEY = 'tasks';

export const useLocalStorage = () => {
  const [storageValue, setStorageValue] = useState<ITask[]>(() => {
    const storageValue = localStorage.getItem(STORAGE_KEY);
    if (!storageValue) return [];

    return JSON.parse(storageValue);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageValue));
  }, [storageValue]);

  const addTask = (task: ITask): void => {
    if (!task) return;
    setStorageValue(prevTasks => [...prevTasks, task]);
  };

  const removeTask = (taskID: string) => {
    if (!taskID) return;
    setStorageValue(prevTasks => prevTasks.filter(item => item.id !== taskID));
  };

  return { tasks: storageValue, addTask, removeTask };
};
