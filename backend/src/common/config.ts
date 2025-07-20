import 'dotenv/config';

export const CONFIG = {
  PORT: 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
  REDIRECT_URI: 'http://localhost:5000',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  GITHUB_AUTH_TOKEN: 'https://github.com/login/oauth/access_token',
  GITHUB_API_USER: 'https://api.github.com/user',
};
