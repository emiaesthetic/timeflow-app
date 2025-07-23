import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getAxiosErrorMessage } from '@/shared/lib/getAxiosErrorMessage';

import { authApi } from '../api/authApi';

import { LoginFormData, RegisterFormData, User } from './types';

export type AuthStore = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;

  initializeSession: () => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  loginWithGithub: (code: string) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>;
  logout: () => void;
};

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      initializeSession: async () => {
        if (get().isAuthenticated) {
          set({ isLoading: true, error: null });

          try {
            const user = await authApi.getCurrentUser();
            set({ user, isAuthenticated: true });
          } catch (error) {
            const message = getAxiosErrorMessage(error);
            set({ error: message, isAuthenticated: false });
            toast.error(message);
          } finally {
            set({ isLoading: false });
          }
        }
      },

      register: async (payload: RegisterFormData) => {
        set({ isLoading: true, error: null });

        try {
          const user = await authApi.register(payload);
          set({ isAuthenticated: true, user });
          toast.success('Successfully registered!');
        } catch (error) {
          const message = getAxiosErrorMessage(error);
          set({ isAuthenticated: false, error: message });
          toast.error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (payload: LoginFormData) => {
        set({ isLoading: true, error: null });

        try {
          const user = await authApi.login(payload);
          set({ isAuthenticated: true, user });
          toast.success('Successfully authorized!');
        } catch (error) {
          const message = getAxiosErrorMessage(error);
          set({ isAuthenticated: false, error: message });
          toast.error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGithub: async (code: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await authApi.loginWithGithub(code);
          set({ isAuthenticated: true, user });
          toast.success('Successfully authorized!');
        } catch (error) {
          const message = getAxiosErrorMessage(error);
          toast.error(message);
          set({ isAuthenticated: false, error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async (code: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await authApi.loginWithGoogle(code);
          set({ isAuthenticated: true, user });
          toast.success('Successfully authorized!');
        } catch (error) {
          const message = getAxiosErrorMessage(error);
          set({ isAuthenticated: false, error: message });
          toast.error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: null,
        });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
