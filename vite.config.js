import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split large, independent vendor libraries into their own chunks
        // so a change to one doesn't invalidate the cache for the others,
        // and so the initial payload isn't one monolithic bundle.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router') || id.includes('/react/') || id.includes('/react-dom/')) return 'vendor-react'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('@supabase')) return 'vendor-supabase'
          if (id.includes('@stripe')) return 'vendor-stripe'
        },
      },
    },
  },
})
