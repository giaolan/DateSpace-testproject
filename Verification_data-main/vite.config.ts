import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // 保留原有路径别名配置，不修改
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000, // 保留原有端口配置
    // 新增：放宽文件系统严格校验，避免字体/路径相关报错
    fs: {
      strict: false
    }
  },
  // 新增：禁用第三方依赖的 SourceMap 生成，解决映射错误
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false
    }
  },
  // 新增：生产环境禁用 SourceMap，减少体积+消除错误
  build: {
    sourcemap: false
  }
})

