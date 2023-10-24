import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("./pages/MainPage.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./pages/RegisterPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/LoginPage.vue"),
    },
    {
      path: "/shops/:id",
      name: "shop",
      component: () => import("./pages/ShopPage.vue"),
    },
    {
      path: "/bad-request",
      name: "bad-request",
      component: () => import("./pages/BadResponsePage.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("./pages/CheckoutPage.vue"),
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("./pages/OrdersPage.vue"),
    },
  ],
});

createApp(App)
  .use(Antd)
  .use(router)
  .use(createPinia())
  .mount("#app");
