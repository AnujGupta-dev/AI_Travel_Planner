import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://ai-travel-planner-2kla.onrender.com'
    }
  },
  plugins: [react()],
})
