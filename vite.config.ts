import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Resolve config
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Development server config
  server: {
    port: 5173,
    open: true,
  },

  // Build config
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],

          // Utilities
          'utils-vendor': ['clsx', 'lucide-react'],
        },
      },
    },
  },

  // Optimization
  optimizeDeps: {
    include: [
      // Core packages
      'react',
      'react-dom',

      // Utilities
      'clsx',
      'lucide-react',
    ],
  },
});
