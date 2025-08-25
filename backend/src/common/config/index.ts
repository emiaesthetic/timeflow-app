import dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, required = true) => {
  const value = process.env[key];

  if (!value && required) {
    throw new Error('Missing required environment variable: ${key}');
  }

  return value || '';
};

export const CONFIG = {
  SERVER_PORT: Number(getEnv('SERVER_PORT', false)) || 5000,
  JWT_SECRET: getEnv('JWT_SECRET'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
  NODE_ENV: getEnv('NODE_END', false),
};

export const AUTH = {
  REDIRECT_URI: 'http://localhost:5173/auth/oauth',

  GITHUB: {
    API_URL: 'https://api.github.com',
    TOKEN_URL: 'https://github.com/login/oauth/access_token',

    getTokenExchangeParams(code: string) {
      return {
        client_id: getEnv('GITHUB_CLIENT_ID'),
        client_secret: getEnv('GITHUB_CLIENT_SECRET'),
        redirect_uri: AUTH.REDIRECT_URI,
        code,
      };
    },
  },

  GOOGLE: {
    API_URL: 'https://www.googleapis.com/oauth2/v1',
    TOKEN_URL: 'https://accounts.google.com/o/oauth2/token',

    getTokenExchangeParams(code: string) {
      return {
        client_id: getEnv('GOOGLE_CLIENT_ID'),
        client_secret: getEnv('GOOGLE_CLIENT_SECRET'),
        redirect_uri: AUTH.REDIRECT_URI,
        grant_type: 'authorization_code',
        code,
      };
    },
  },
};
