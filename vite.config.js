import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Toda vez que você usar uma URL que começa com '/api'
      '/api': {
        target: 'http://localhost:9090', // O endereço do seu Back-end
        changeOrigin: true,
        // Isso remove o '/api' antes de enviar para o back-end
        // Ex: /api/parking-spot vira http://localhost:9090/parking-spot
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})