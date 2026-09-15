import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Overridable per deploy target: this repo is served at /mi-portafolio/,
  // but the same build can also target a differently-named repo (e.g. the
  // liancasi/Portafolio account, served at /Portafolio/).
  base: process.env.VITE_BASE || '/mi-portafolio/',
  plugins: [react(), tailwindcss()],
})
