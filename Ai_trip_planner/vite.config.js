import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'ai-travel-planner-pdaz.vercel.app'
    }
  },
  plugins: [react()],
})
