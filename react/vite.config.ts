// Tailwindcss
import tailwindcss from '@tailwindcss/vite';

// Vite
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
