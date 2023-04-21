import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // sourcemap: true,
    lib: {
      entry: {
        'pino': './src/index.js',
        'pino_zhCN_data': './src/providers/zh_CN/data/index.js',
      },
      // name: 'pino',
      // fileName: (format, entryName) => entryName+'.'+format+'.js'
    },
  },
});
