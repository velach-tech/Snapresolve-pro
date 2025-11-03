import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Adjust base for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/Snapsolve-pro/',
})
