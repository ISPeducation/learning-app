// vite.config.mjs

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './', // Use relative path for Netlify, GitHub Pages, etc.
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects', // Only copy the _redirects file (more efficient)
          dest: '' // Root of dist folder
        }
      ]
    })
  ],
  server: {
    historyApiFallback: true // Prevents 404 on nested routes during dev
  }
});
