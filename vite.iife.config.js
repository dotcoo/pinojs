import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: './src/index.js',
      formats: ['iife'],
      name: 'pinojs',
      // fileName: (format, entryName) => entryName+'.'+format+'.js'
      fileName: (format, entryName) => 'pinojs.iife.js'
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
