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
    CLIENT_ID: getEnv('GITHUB_CLIENT_ID'),
    CLIENT_SECRET: getEnv('GITHUB_CLIENT_SECRET'),
    TOKEN_URL: 'https://github.com/login/oauth/access_token',
    USER_API: 'https://api.github.com/user',
  },

  GOOGLE: {
    CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
    CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
    TOKEN_URL: 'https://accounts.google.com/o/oauth2/token',
    USER_API: 'https://www.googleapis.com/oauth2/v1/userinfo',
  },
};
