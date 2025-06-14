import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchToken, fetchUserProfile } from './api';
import { SessionState } from './types';

export const useAuthStore = create(
  persist<SessionState>(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      error: null,
      loading: false,

      setToken: token => set({ token }),

      setUser: user => set({ user }),

      login: async code => {
        if (!code) return false;

        set({ loading: true, error: null });

        try {
          const token = await fetchToken(code);

          if (token) {
            get().setToken(token);

            try {
              const userProfile = await fetchUserProfile(token);

              if (userProfile) {
                set({
                  loading: false,
                  isAuthenticated: true,
                  user: userProfile,
                });
                return true;
              } else {
                get().logout();
                set({ error: 'Failed to load user profile.', loading: false });
                return false;
              }
            } catch (error) {
              const message =
                error instanceof AxiosError
                  ? error.message
                  : 'Failed to load user profile.';

              set({ error: message, loading: false });
              return false;
            }
          }
        } catch (error) {
          const message =
            error instanceof AxiosError ? error.message : 'Log in failed.';

          set({ error: message, loading: false });
          return false;
        }
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, user: null, error: null });
      },

      initializeSession: async () => {
        if (get().loading || get().isAuthenticated) return;

        const token = get().token;
        if (!token) return;

        set({ loading: true, error: null });

        try {
          const userProfile = await fetchUserProfile(token);

          if (userProfile) {
            set({ loading: false, isAuthenticated: true, user: userProfile });
          } else {
            get().logout();
            set({ loading: false, error: 'Failed to load user profile.' });
          }
        } catch (error) {
          const message =
            error instanceof AxiosError
              ? error.message
              : 'Error initializing session.';

          set({ loading: false, error: message });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
