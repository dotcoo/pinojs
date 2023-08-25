import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // sourcemap: true,
    lib: {
      entry: {
        'pinojs': './src/index.js',
        'pinojs_data_zhCN': './src/providers/zh_CN/data/index.js',
      },
      formats: ['es', 'cjs'],
      // name: 'pino',
      // fileName: (format, entryName) => entryName+'.'+({es:'mjs',cjs:'cjs'}[format]),
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
