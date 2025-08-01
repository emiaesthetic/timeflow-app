import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getErrorMessage } from '@/shared/api';
import { CONFIG } from '@/shared/config';

import { authApi } from '../api/authApi';

import { LoginFormData, RegisterFormData, User } from './types';

export type AuthStore = {
  isInitialized: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  error: string | null;

  initializeSession: () => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  loginWithGithub: (code: string) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>;
  refresh: () => Promise<string>;
  logout: () => Promise<void>;
};

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isInitialized: false,
      isLoading: false,
      isAuthenticated: false,
      token: null,
      user: null,
      error: null,

      initializeSession: async () => {
        if (get().isAuthenticated) {
          try {
            await get().refresh();
          } catch {
            return;
          }
        }

        set({ isInitialized: true });
      },

      register: async (payload: RegisterFormData) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.register(payload);
          set({ isAuthenticated: true, token, user });
          toast.success('Successfully registered!');
        } catch (error) {
          const message = getErrorMessage(error);
          set({ isAuthenticated: false, error: message });
          toast.error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (payload: LoginFormData) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.login(payload);
          set({ isAuthenticated: true, token, user });
          toast.success('Successfully authorized!');
        } catch (error) {
          const message = getErrorMessage(error);
          set({ isAuthenticated: false, error: message });
          toast.error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGithub: async (code: string) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.loginWithGithub(code);
          set({ isAuthenticated: true, token, user });
          toast.success('Successfully authorized!');
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(message);
          set({ isAuthenticated: false, error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async (code: string) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.loginWithGoogle(code);
          set({ isAuthenticated: true, token, user });
          toast.success('Successfully authorized!');
        } catch (error) {
          const message = getErrorMessage(error);
          set({ isAuthenticated: false, error: message });
          toast.error(message);
        } finally {
          set({ isLoading: false });
        }
      },

      refresh: async () => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.refresh();
          set({ token, user });
          return token;
        } catch (error) {
          await get().logout();
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          return;
        } finally {
          set({
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
            error: null,
          });
        }
      },
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
