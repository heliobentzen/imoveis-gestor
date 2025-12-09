import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // ← ESSENCIAL PARA O REACT FUNCIONAR
    tailwindcss(),  // Tailwind plugin
  ],
})
