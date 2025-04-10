import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'src/apis', dest: 'src' },
        { src: 'src/assets', dest: 'src' },
        { src: 'src/components', dest: 'src' },
        { src: 'src/hooks', dest: 'src' },
        { src: 'src/pages', dest: 'src' },
        { src: 'src/utils', dest: 'src' },
      ],
    }),
  ],
});
