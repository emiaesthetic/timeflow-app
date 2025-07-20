/* eslint-disable no-console */
import { buildApp } from './app';
import { CONFIG } from './common/config';

async function startServer() {
  try {
    const app = await buildApp();
    await app.listen({ port: CONFIG.SERVER_PORT });

    console.log('🚀 Server is running on http://localhost:5000');
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

startServer();
