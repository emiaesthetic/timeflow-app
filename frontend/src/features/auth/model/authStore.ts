import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CONFIG } from '@/shared/config';

export type AuthStore = {
  isAuthenticated: boolean;
  token: string | null;

  setToken: (token: string) => void;
  clearToken: () => void;
};

export const authStore = create<AuthStore>()(
  persist(
    set => ({
      isAuthenticated: false,
      token: null,

      setToken: (token: string) => set({ token, isAuthenticated: true }),

      clearToken: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: CONFIG.STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        token: state.token,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          state.isAuthenticated = !!state.token;
        }
      },
    },
  ),
);
