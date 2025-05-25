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

  const removeTask = (taskID: string): void => {
    if (!taskID) return;
    setStorageValue(prevTasks => prevTasks.filter(task => task.id !== taskID));
  };

  const editTask = (updatedTask: ITask): void => {
    if (!updatedTask) return;
    setStorageValue(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
      ),
    );
  };

  return { tasks: storageValue, addTask, editTask, removeTask };
};
