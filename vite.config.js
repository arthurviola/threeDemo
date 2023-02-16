import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve:{
    //设置路径别名
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名
    },
  },
  css: {
    preprocessorOptions: {
      // 处理vite报错Internal server error: Inline JavaScript is not enabled. Is it set in your options?
      less: {
        // src/css/common.less 是你需要全局变量 （你定义的定义的方法 和 变量等）
        javascriptEnabled: true,
      },
    },
  },
})
