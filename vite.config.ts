import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { tempoVitePlugin } from 'tempo-sdk'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tempoVitePlugin(), react(), tailwindcss()],
})
