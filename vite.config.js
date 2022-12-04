import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite'; // 自動引入
import { GenLocalesPlugin } from './src/plugins/i18n/genLocales.js'; // i18n 文件解析

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    GenLocalesPlugin({
      path: './src/plugins/i18n',
      target: 'locales.json'
    }), // i18n 文件解析
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      cache: false
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ],
          '[package-name]': [
            '[import-names]',
            // alias
            ['[from]', '[alias]']
          ]
        }
      ],
      dts: './src/plugins/unpluginAutoImport/auto-imports.js',
      dirs: [],
      vueTemplate: false,
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './src/plugins/unpluginAutoImport/.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
