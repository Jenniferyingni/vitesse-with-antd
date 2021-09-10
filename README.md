# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

### Docs:

最近完成了一个公司内部的网站，开发使用 `vue3` 和 `vite` 的全新的 web 框架 [vitesse](https://github.com/antfu/vitesse)， 作者是 vue 的核心开发成员 antfu.

`vitesse` 除了包含 `vite` 启动快， 热更新快，修改配置文件不需要重启等优点外，还加入了一系列便于开发的插件，包含自动按需引入，路由自动生成，`layout` 系统布局，还有 多语言 `i18n` 和 `markdown` 的支持。

除了采用 `TypeScript`， 还采用了 vue3 更简洁的  `<script setup>` 语法。

在样式方面，采用了功能类优先（utility-first）的 [windicss](https://windicss.org/),  通过类名来使用内置的 css 样式，可以通过类名解决大部分的样式问题，包含 css 伪类， 暗黑模式变体等， 样式中的计量单位都采用的是经过响应式处理的 `rem` 。

有了这些深得开发者心的功能，整体的开发体验是比较好的。  

开发工具上， chrome 插件市场有新的 beta 版的 `Vue.js devtools`，需要卸载掉原来的重装，新插件同时支持 vue2 和 vue3, vscode 插件由原来的 `Vetur` 切换为 `Volar`。

GitHub 上提供了整体框架的 demo，想要上手来试一试 `vue3` 和 `vite`，或者是要搭建自己的网站的的话可以 `clone` 这个 demo. 地址：[vitesse-with-antd](https://github.com/Jenniferyingni/vitesse-with-antd)， 欢迎 star~

下面会对使用的整体框架进行分析，以及实现的功能点的介绍。

## 框架分析

### 按需引入

#### 组件按需引入

组件的按需引用使用了 [vite-plugin-components](https://github.com/antfu/vite-plugin-components) ，会让指定目录下的文件按需加载，默认的路径是 `src/components`， 在项目中可直接使用组件，省去了在每个 vue 文件中单独的 import 。

``` html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>
​
<script setup lang="ts">
</script>
```

会自动转化成这样

``` html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>
​
<script setup lang="ts">
import HelloWorld from './src/components/HelloWorld.vue'
</script>
```

#### 图标按需引入
[vite-plugin-icons](https://github.com/antfu/vite-plugin-icons) 插件支持引入 `iconify` 中的所有图标，在 `vite-plugin-components` 中一起使用也可以不用单独 import 就直接使用 `iconify` 提供的图标， 支持的图标可以访问 [icones](https://icones.js.org/) 查找。


![1628652962773_image-20210811111752196.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff5452c1fc0a479597dbd86b8542dc0c~tplv-k3u1fbpfcp-watermark.image)

#### UI 库的按需引入

以 `ant-design-vue` 为例，同时还支持 UI 组件库的按需引入, 可直接使用 UI 组件， 这里匹配了以 A 开头的组件从 `node-modules` 中 `ant-design-vue` 中引入。

以上提到的所有按需引入的功能在 vite 中的配置如下：

``` typescript
import ViteComponents from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
export default defineConfig({
  plugins: [
    // https://github.com/antfu/vite-plugin-components
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
  ]
})
```

### 路由和 layout

路由和 `layout` 的处理交给了 2 个插件，[vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) 和 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

`vite-plugin-pages` 可以默认将 `pages` 路径下的 vue 文件自动生成路由，`layouts` 可以通过每个 pages 目录下 vue 文件中的定义来指定使用哪一个 `layout`， 比如下面的定义让当前的路由加载 `src/layouts/empty` 文件。

``` html
<route lang="yaml">
  meta:
    layout: empty
</route>
```

关于路由的创建，在以前的 `vue-router 3.x` 版本中，我们通过 `mode` 来控制是使用 `history` 还是 `hash` 模式的路由，在 4.x 中是通过 `createWebHistory`， `createWebHashHistory` 来区分

``` javascript
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "layouts-generated";
import generatedRoutes from "pages-generated";
​
const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(router);
```

### TypeScript 相关

web-dev 中全局使用了 TypeScript, 局部使用的类型定义我们可以在单个 vue 文件中单独定义，也可以单独使用 `d.ts` 文件，一些全局通用的类型定义我们放在了根路径的 types 文件夹下面。

TypeScript的配置文件 tsconfig.json 中支持定义全局类型的路径配置

``` json
"typeRoots": ["./node_modules/@types/", "./types"]
```

在 `typeRoots` 下的 `d.ts` 文件中定义的类型为全局类型，可以在全局无需额外引入直接使用这些类型。

但需要注意如果 `d.ts` 中含有了 导入，导出，全局类型定义就会失效，详情可参考这个 [issues](https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript)。

对于 `vue3` 中 `props` 的类型定义，不能直接使用创建时的类型定义，而需要使用 `vue3` 提供的类型 `PropType` 来指明构造函数。顺便说明一下 `vue3` 中是使用 `defineProps` 来定义 `props`。

``` javascript
import type { PropType } from 'vue'
const props = defineProps({
  list: {
    type: Array as PropType<MaterialConfig[]>,
    default: []
  }
})
const { list } = toRefs(props)
```

### hooks 的使用

目前对于 `hooks` 的使用主要是抽取了一些可复用的方法，和 `composition-api` 的设计思想相符，侧重于实现同一功能模块的逻辑放在一个 `hooks` 中，一个 `hooks` 中我们可以 `export` 出多个变量或者是方法。

参照 vue 给出的图，其实我们可以理解为一个 `hooks` 实现的逻辑可以代表右图中的一个色块

![image-20210910185735263.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f6428a56f3e4048bbed714fc0565f32~tplv-k3u1fbpfcp-watermark.image)

一个常见的 `hooks` 的结构如下

``` javascript
import { ref } from 'vue'
​
export const useMyHooks = (params) => {
  const data = ref([])
  const functionData = () => {
    // Do Sth
  }
  return {
    data,
    functionData
  }
}
​
```

写 `hooks` 的时候比较容易遇到的问题

(1) `hooks` 中的逻辑要尽量与外部逻辑解耦，抽取逻辑之后提供的方法要便于使用和减少相同逻辑的重复实现

(2) 每次执行 `useMyHooks` 其实变量都是会开辟一个单独的存储空间，如果你有一些共享变量请在 `useMyHooks` 外部声明。

根据目前的使用体验来看，就逻辑复用这一点，其实 `hooks` 能实现的功能 `mixin` 应该也能实现。

只是 `hooks` 在使用时用到的每一个方法时用户有意识的去选择的，比如我需要使用 `hooks` 提供的常量A，方法B，那么我需要有意识的手动去引入这些我要复用的内容，这样方法和变量的来源也就更清晰。

`mixin` 的自由度更大，只要是用了这个 `mixin` 就默认所有方法都隐式的引入了，导致版本迭代和多人开发之后可能不好去维护。

## 功能点实现

### UI 库主题色修改

`ant-design-vue` 的默认皮肤是蓝色，在设计上我们需要把默认的皮肤色切换成紫色，更符合我们想要的风格。

`antd` 的官网只提供了在 `webpack` 中修改主题色 `less` 变量的方法，在 `vite` 中也提供了 `css` 的预处理器，我们可以通过如下配置来实现主题色的修改：

``` javascript
// vite.config.js
export default defineConfig({
    css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#7546c9'
        },
      },
    },
  },
})
```

### 暗夜模式在线切换

在 antd 中修改主题色，只需要修改一个 `primary-color` 变量，修改暗夜模式则需要改变一系列的变量值，并且需要支持在线切换功能。我们使用到了 `vite-plugin-theme` 提供的 `antdDarkThemePlugin`。

大概实现原理是先拿到 `antd` 中的 `dark.less` 变量 -> `antdDarkThemePlugin` 根据这些变量值生成一个暗夜模式的 css 文件 -> 样式文件插入到 html 中。

用户切换暗黑模式，修改body中的 `[data-theme=dark]`， 从而使用暗黑模式的样式。

``` javascript
import { viteThemePlugin, antdDarkThemePlugin } from 'vite-plugin-theme';
import { getLessVars } from 'antd-theme-generator';
const antdDarkVars = getLessVars('./node_modules/ant-design-vue/lib/style/themes/dark.less')
​
export default defineConfig({
  plugins:[
    viteThemePlugin({
      colorVariables: [''],  // 需要给一个初始值才能正常使用功能
    }),
    antdDarkThemePlugin({
      darkModifyVars: {
        'primary-color': '#7546c9',   // 暗黑模式也是支持紫色的皮肤
        ...antdDarkVars             
      }
    })  
  ]  
})
```

切换模式的方法我们抽取到了 `hooks` 中, 使用到了 `@vueuse/core` 提供的 `useDark`, `useToggle`， 是为了修改 `storage` 中的暗黑模式变量，让用户切换操作的模式切换得到缓存，同时 `tailwindcss` 的暗黑模式变体应该也是从这里取值。

切换时还需要重新加载一下 `css` 文件，生产模式下模式切换才能生效。

``` javascript
import { useDark, useToggle } from '@vueuse/core';
import { loadDarkThemeCss } from 'vite-plugin-theme/es/client';
​
export function useToggleDark() {
  const isDark = useDark()
  const toggleDarkDefault = useToggle(isDark);
  
  const toggleAntd = async () => {
    if(isDark.value) {
      await loadDarkThemeCss();
      document.body.setAttribute('data-theme','dark')
    } else {
      document.body.setAttribute('data-theme','light')
    }
  }
  
  toggleAntd()             // 初始时先执行一次
  
  const toggleDark = async () => {
    toggleDarkDefault();
    // 修改antd为暗黑模式
    toggleAntd()
  };
​
  
  return { isDark, toggleDark }
}
```

### 全局的进入动画效果

`windicss` 支持自定义类名，在 web-dev 中我们使用 [vue-vben-admin](https://github.com/anncwb/vue-vben-admin) 中的实现，定义了 `enter-x`, `enter-y`, `-enter-x`,`-enter-y` 来定义了一些渐进的动画效果，实现使用了类名的子元素的动画效果。

windicss 的提供插件 `@windicss/animations` 里也有很多定义好的动画效果方案，可以使用这些动画效果来提升用户体验。

### Emoji 的引入

为了增加平台的互动性，我们模拟 `Github` 实现了评论和表情回复功能

![image-20210910191006589.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8460567cd01b46bab3d9c880231eab78~tplv-k3u1fbpfcp-watermark.image)

想要挑选自己想要使用的 emoji, 可以从这个网站中查找： [listemoji](https://listemoji.com/)

