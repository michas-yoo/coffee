import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("./views/MainPage.vue"),
    },
  ],
});

createApp(App)
  .use(Antd)
  .use(router)
  .mount('#app')
