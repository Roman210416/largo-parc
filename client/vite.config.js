import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // căi relative, ca site-ul să meargă și pe GitHub Pages
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:4000' } },
});
