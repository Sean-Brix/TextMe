import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    open: true,
    port: 5173,
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/auth':{
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
