<script setup>
import { useRouter } from "vue-router";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
import { computed } from "vue";
import { appStore } from "../store.js";

const page = computed(() => appStore.currentPage);

const router = useRouter();
const panels = [
  {
    id: "main",
    name: "Главная",
    icon: HomeOutlined,
    onClick: () => router.push({ name: "main" }),
  },
  {
    id: "orders",
    name: "Заказы",
    icon: FileTextOutlined,
    onClick: () => router.push({ name: "orders" }),
  },
  {
    id: "checkout",
    name: "Корзина",
    icon: ShoppingCartOutlined,
    onClick: () => router.push({ name: "checkout" }),
  },
  {
    id: "account",
    name: "Аккаунт",
    icon: UserOutlined,
    onClick: () => router.push({ name: "account" }),
  },
];

const onPanelChange = (panelId) => {
  panels.find((panel) => panel.id === panelId)?.onClick();
};
</script>

<template>
  <ATabs
    size="large"
    class="tab-bar"
    @change="onPanelChange"
    :activeKey="page"
  >
    <ATabPane v-for="panel in panels" :key="panel.id">
      <template #tab>
        <component :is="panel.icon" />
        <span class="panel-name">{{ panel.name }}</span>
      </template>
    </ATabPane>
  </ATabs>
</template>

<style scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  display: grid;
  place-items: center;
  padding: 0 20px;
  background-color: #ffffff;
  z-index: 2;
}

@media screen and (max-width: 500px) {
  .panel-name {
    display: none;
  }
}
</style>
