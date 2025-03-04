import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'fc50-114-10-77-55.ngrok-free.app', // Tambahkan host ini
    ],
    host: true, // Izinkan akses dari jaringan lokal
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
