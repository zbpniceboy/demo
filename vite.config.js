import { fileURLToPath, URL } from 'node:url'

import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default ({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  console.log(env)

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: env.VITE_APP_BASE_URL,
    server: {
      host: true,
      hmr: true,
      proxy: {
        '/proxyApi': {
          target: env.VITE_APP_API_BASE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxyApi/, ''),
        },
      },
    },
  }
}
