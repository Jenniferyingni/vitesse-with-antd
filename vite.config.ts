import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from "vite-plugin-windicss";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import ViteComponents from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vueComponent/ant-design-vue/issues/4220
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
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
  ],
  server: {
    host: '0.0.0.0',
  }
})
