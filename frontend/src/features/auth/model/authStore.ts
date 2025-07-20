import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authApi } from '../api/authApi';

import { LoginFormData, RegisterFormData, User } from './types';

export type AuthStore = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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
        const currentToken = get().token;

        if (currentToken) {
          set({ isLoading: true, error: null });

          try {
            const user = await authApi.getCurrentUser(currentToken);
            set({ user, isAuthenticated: true });
          } catch (error) {
            const message =
              error instanceof AxiosError
                ? error.message
                : 'Error during session verification';
            set({ error: message, isAuthenticated: false });
          } finally {
            set({ isLoading: false });
          }
        }
      },

      register: async (payload: RegisterFormData) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.register(payload);
          set({ token, user, isAuthenticated: true });
        } catch (error) {
          const message =
            error instanceof AxiosError ? error.message : 'Registration error';
          set({ error: message, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (payload: LoginFormData) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.login(payload);
          set({ token, user, isAuthenticated: true });
        } catch (error) {
          const message =
            error instanceof AxiosError ? error.message : 'Login error';
          set({ error: message, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGithub: async (code: string) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.loginWithGithub(code);
          set({ token, user, isAuthenticated: true });
        } catch (error) {
          const message =
            error instanceof AxiosError ? error.message : 'Github auth error';
          set({ error: message, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async (code: string) => {
        set({ isLoading: true, error: null });

        try {
          const { token, user } = await authApi.loginWithGoogle(code);
          set({ token, user, isAuthenticated: true });
        } catch (error) {
          const message =
            error instanceof AxiosError ? error.message : 'Google auth error';
          set({ error: message, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        token: state.token,
      }),
    },
  ),
);
