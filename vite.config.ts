import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from "vite-plugin-windicss";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import ViteComponents from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";

import { viteThemePlugin, antdDarkThemePlugin } from 'vite-plugin-theme';
import { getLessVars } from 'antd-theme-generator';
// antd自定义变量和暗黑模式变量
import antdCustomVars from './src/antd/custom'
const antdDarkVars = getLessVars('./node_modules/ant-design-vue/lib/style/themes/dark.less')

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    }
  },
  // https://github.com/vueComponent/ant-design-vue/issues/4220
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#7546c9'
        }
      },
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    Pages(),
    Layouts(),
    ViteComponents({
      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: "",
        }),
        (name: string) => {
          if (name.startsWith('A'))
            return { importName: name.slice(1), path: 'ant-design-vue' }
        },
      ],
    }),
    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),
    viteThemePlugin({
      colorVariables: ['#7546c9'],
    }),
    antdDarkThemePlugin({
      darkModifyVars: {
        'primary-color': '#7546c9',
        ...antdDarkVars
      }
    })
  ],
  server: {
    host: '0.0.0.0',
  }
})
