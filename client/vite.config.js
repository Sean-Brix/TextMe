import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    port: 5173,
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/auth':{
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/socket.io':{
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true
      }
    },
    
  },
  plugins: [react()],
})
