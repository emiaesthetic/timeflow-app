export interface UserProfile {
  id: number;
  login: string;
  email: string;
  avatarUrl: string;
}

export interface SessionState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  setToken: (token: string) => void;
  setUser: (user: UserProfile) => void;
  login: (code: string) => Promise<boolean | void>;
  logout: () => void;
  initializeSession: () => Promise<void>;
}
