import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
export default defineConfig({
    plugins: [vue()],
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: `import { h, Fragment } from 'vue'`
    },
    resolve:{
        alias:{
        '@': path.resolve(__dirname, 'src')
        }
    },
    css:{
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve('src/assets/css/page.less')}";`,
                },
                javascriptEnabled: true
            }
        }
  }
})
