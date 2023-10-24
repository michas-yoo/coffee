<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/AppStore.ts";
import {
  HomeOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const appStore = useAppStore();

const panels = [
  {
    id: "main",
    name: "Главная",
    icon: HomeOutlined,
    onClick: async () => await router.push({ name: "main" }),
  },
  {
    id: "orders",
    name: "Заказы",
    icon: FileTextOutlined,
    onClick: async () => await router.push({ name: "orders" }),
  },
  {
    id: "checkout",
    name: "Корзина",
    icon: ShoppingCartOutlined,
    onClick: async () => await router.push({ name: "checkout" }),
  },
];

const onPanelChange = async (panelId: string) => {
  const panel = panels.find((panel) => panel.id === panelId);
  await panel?.onClick();
};
</script>

<template>
  <ATabs
    size="large"
    class="tab-bar"
    @change="onPanelChange"
    :activeKey="appStore.currentPage"
  >
    <ATabPane v-for="panel in panels" :key="panel.id">
      <template #tab>
        <component :is="panel.icon" />
        <span class="panel-name">{{ panel.name }}</span>
      </template>
    </ATabPane>
  </ATabs>
</template>

<style lang="scss" scoped>
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

  :deep(.ant-tabs-nav) {
    margin-bottom: 20px;

    &::before {
      display: none;
    }

    .ant-tabs-nav-list {
      justify-content: space-between;
      margin: 0 auto;
    }
  }
}

@media screen and (max-width: 500px) {
  .panel-name {
    display: none;
  }
}
</style>
