import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("./views/MainPage.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/RegisterPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/LoginPage.vue"),
    },
    {
      path: "/shops/:id",
      name: "shop",
      component: () => import("./views/ShopPage.vue"),
    },
    {
      path: "/bad-request",
      name: "bad-request",
      component: () => import("./views/BadResponsePage.vue"),
    },
  ],
});

createApp(App)
  .use(Antd)
  .use(router)
  .mount("#app");
