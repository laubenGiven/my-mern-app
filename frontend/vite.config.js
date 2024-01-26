import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying all requests starting with /api to the backend server
      '/api': {
        target: 'http://localhost:5000', // Your backend server
        changeOrigin: true,
        secure: false,
        ws: true, // proxy websockets if needed
        rewrite: (path) => path.replace(/^\/api/, '') // remove /api
      },
    },
  },
})
