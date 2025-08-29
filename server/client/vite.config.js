import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use a simple proxy in dev to avoid CORS headaches
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
});
