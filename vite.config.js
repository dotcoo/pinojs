import { defineConfig } from 'vite';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => ({
  build: {
    lib: {
      entry: {
        [mode == 'rich' ? 'pinojs.rich' : 'pinojs']: './lib/index.js',
      },
      name: 'pinojs',
    },
  },
}));
