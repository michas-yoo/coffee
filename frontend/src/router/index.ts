import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../pages/MainPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/shops/:id",
    name: "shop",
    component: () => import("../pages/ShopPage.vue"),
  },
  {
    path: "/bad-request",
    name: "bad-request",
    component: () => import("../pages/BadResponsePage.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../pages/CheckoutPage.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../pages/OrdersPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
