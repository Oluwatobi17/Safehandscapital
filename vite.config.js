import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, // 1.5MB
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['antd', 'lodash', 'moment'],
        }
      }
    }
  }
})