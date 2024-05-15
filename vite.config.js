import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://54.180.152.62:8080',
        changeOrigin: true,
        headers: {
          allow : 'GET, HEAD, POST, DELETE, OPTIONS, PUT'
        }
      },
    },
  },
});