const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'app_client/principal'),
  base: '/principal-react/',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    outDir: path.resolve(__dirname, 'public/principal-react'),
    emptyOutDir: true,
    manifest: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'app_client/principal/src/main.jsx'),
      output: {
        entryFileNames: 'principal.js',
        chunkFileNames: 'principal-[name].js',
        assetFileNames: 'principal.[ext]'
      }
    }
  }
});
