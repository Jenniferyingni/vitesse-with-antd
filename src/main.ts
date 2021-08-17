import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "layouts-generated";
import generatedRoutes from "pages-generated";

import 'ant-design-vue/dist/antd.less';

import "virtual:windi.css";
import "./styles/main.css";

(async () => {
  const app = createApp(App);

  const routes = setupLayouts(generatedRoutes);

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  app.use(router);

  app.mount("#app", true);
})();
