import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://be-pemira-esport-production-af04.up.railway.app",
        changeOrigin: true,
        secure: false
      }
    }
  }
});

