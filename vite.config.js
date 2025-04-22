import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ 이 줄 추가
import { fileURLToPath } from 'url'; // ✅ 이거 추가!

const __filename = fileURLToPath(import.meta.url); // ✅
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ 이 줄 추가
    },
  },
});
