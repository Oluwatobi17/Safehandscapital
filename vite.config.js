import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // Vercel expects this by default
    emptyOutDir: true,
    chunkSizeWarningLimit: 5500, // Adjust limit in kBs (default is 500)
  }
})
