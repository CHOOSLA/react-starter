import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
// 👉 Auto import
import AutoImport from 'unplugin-auto-import/vite'
// 👉 Icon 사용
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-react-components/vite'
// 👉 TailwindCSS (선택 시)
import tailwindcss from 'tailwindcss'

// 👉 테스트용 (Vitest)
export default defineConfig({
  plugins: [
    react(),

    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),

    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          enabledCollections: ['mdi', 'tabler'],
        }),
      ],
    }),

    Icons({
      autoInstall: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
