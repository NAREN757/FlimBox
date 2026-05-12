import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/'        → Vercel (served from domain root)
// base: '/FlimBox/' → GitHub Pages (served from /FlimBox/ subpath)
// Controlled by VITE_BASE_PATH env var set in the deploy script
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
