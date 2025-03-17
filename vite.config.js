import { defineConfig } from 'vite';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => ({
  build: {
    lib: {
      entry: {
        [mode == 'rich' ? 'pinojs.rich' : 'pinojs']: './src/index.js',
      },
      name: 'pinojs',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
}));
