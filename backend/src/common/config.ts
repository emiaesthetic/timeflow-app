import 'dotenv/config';

export const CONFIG = {
  PORT: 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
};
