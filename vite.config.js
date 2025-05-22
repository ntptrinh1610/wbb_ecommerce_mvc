import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    // headers: { "Cross-Origin-Embedder-Policy": "unsafe-none", },
    // headers: { "Cross-Origin-Opener-Policy": "same-origin-allow-popups", },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
