import { create } from 'zustand';

import { Task } from '../types/task';

type CurrentTask = {
  currentTask: Task | null;
  setCurrentTask: (task: Task) => void;
  resetCurrentTask: () => void;
};

export const useCurrentTask = create<CurrentTask>(set => ({
  currentTask: null,
  setCurrentTask: task => set({ currentTask: task }),
  resetCurrentTask: () => set({ currentTask: null }),
}));
