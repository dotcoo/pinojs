import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: {
        [mode == 'rich' ? 'pinojs.rich' : 'pinojs']: './lib/index.js',
      },
      name: 'pinojs',
    },
  },
}));
