import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

export default defineConfig({
  build: {
    plugins: [react()],
    chunkSizeWarningLimit: 5500, // Adjust limit in kBs (default is 500)
  }
})
