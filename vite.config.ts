import { fileURLToPath, URL } from 'node:url';

import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vitest/config';

const isVitest = Boolean(process.env.VITEST);

export default defineConfig({
  plugins: [!isVitest && reactRouter()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
    include: ['src/**/*.test.{ts,tsx}']
  }
});
