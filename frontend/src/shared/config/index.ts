function getEnvVar(name: string) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error('Missing environment variable: ${name}');
  }

  return value;
}

function withParams(url: string, params?: Record<string, string>) {
  if (!params) return url;
  const searchParams = new URLSearchParams(params).toString();
  return `${url}?${searchParams}`;
}

export const CONFIG = {
  APP_URL: getEnvVar('VITE_APP_URL'),
  SERVER_URL: getEnvVar('VITE_SERVER_URL'),
  GOOGLE_CLIENT_ID: getEnvVar('VITE_GOOGLE_CLIENT_ID'),
  GITHUB_CLIENT_ID: getEnvVar('VITE_GITHUB_CLIENT_ID'),

  STORAGE_KEYS: {
    AUTH: 'timeflow-auth',
    TASKS: 'timeflow-tasks',
  },

  ROUTES: {
    HOME: '/',
    REGISTER: '/auth/sign-up',
    LOGIN: '/auth/sign-in',
    OAUTH: '/auth/oauth',
  },
};

export const API = {
  BASE_URL: `${CONFIG.SERVER_URL}/api/v1`,

  auth(path = '', params?: Record<string, string>) {
    const endpoint = path ? `auth/${path}` : 'auth';
    return withParams(`${API.BASE_URL}/${endpoint}`, params);
  },

  users(path = '', params?: Record<string, string>) {
    const endpoint = path ? `users/${path}` : 'users';
    return withParams(`${API.BASE_URL}/${endpoint}`, params);
  },

  tasks(path = '', params?: Record<string, string>) {
    const endpoint = path ? `tasks/${path}` : 'tasks';
    return withParams(`${API.BASE_URL}/${endpoint}`, params);
  },
};

export const AUTH = {
  getGithubRedirectUrl() {
    const params = new URLSearchParams({
      client_id: CONFIG.GITHUB_CLIENT_ID,
      redirect_uri: `${CONFIG.APP_URL}${CONFIG.ROUTES.OAUTH}`,
      scope: 'user:email',
      state: 'github',
    });
    return `https://github.com/login/oauth/authorize?${params}`;
  },

  getGoogleRedirectUrl() {
    const params = new URLSearchParams({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      redirect_uri: `${CONFIG.APP_URL}${CONFIG.ROUTES.OAUTH}`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
      state: 'google',
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  },
};
