if (!import.meta.env.VITE_GITHUB_CLIENT_ID) {
  throw new Error('Missing GITHUB_CLIENT_ID in environment variables');
}

export const GITHUB_API = 'https://api.github.com';
export const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID;
export const GITHUB_AUTH_URL =
  'https://github.com/login/oauth/authorize' + `?client_id=${GITHUB_CLIENT_ID}`;
export const GITHUB_AUTH_TOKEN = 'https://github.com/login/oauth/access_token';
