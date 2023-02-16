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
  }
})
