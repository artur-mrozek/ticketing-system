import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'https://api:3001',
        changeOrigin: true,
        logLevel: 'debug',
        secure: false
      }
    },
  },
})
