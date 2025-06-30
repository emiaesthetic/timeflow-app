import { useEffect, useState } from 'react';

import { transformStorageItemToTask } from '../lib/transformTask';

import { Task, TaskStorageItem } from './types';

const STORAGE_KEY = 'tasks';

export function useTasks() {
  const [storageValue, setStorageValue] = useState<Task[]>(() => {
    const storageValue = localStorage.getItem(STORAGE_KEY);
    if (!storageValue) return [];

    return JSON.parse(storageValue).map((item: TaskStorageItem) =>
      transformStorageItemToTask(item),
    );
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageValue));
  }, [storageValue]);

  const createTask = (task: Task): void => {
    if (!task) return;
    setStorageValue(prevTasks => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task): void => {
    if (!updatedTask) return;
    setStorageValue(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
      ),
    );
  };

  const deleteTask = (taskID: string): void => {
    if (!taskID) return;
    setStorageValue(prevTasks => prevTasks.filter(task => task.id !== taskID));
  };

  return { tasks: storageValue, createTask, updateTask, deleteTask };
}
