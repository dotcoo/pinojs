import { defineConfig } from 'vite';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => ({
  build: {
    lib: {
      entry: {
        [mode == 'rich' ? 'pinojs.rich' : 'pinojs']: './src/index.js',
      },
      formats: ['es', 'cjs', 'umd'],
      name: 'pinojs',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
}));
