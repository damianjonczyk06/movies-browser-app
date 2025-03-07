import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const vendorArray = ['react', 'react-dom', 'react-router', '@tanstack/react-query', '@chakra-ui/react'];

// https://vite.dev/config/
export default defineConfig(() => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: vendorArray,
        },
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
}));
