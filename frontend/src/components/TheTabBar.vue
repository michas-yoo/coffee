<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();

const activeKey = ref("panel_1");
const panels = [
  {
    id: "panel_1",
    name: "Главная",
    icon: HomeOutlined,
    onClick: () => router.push({ name: "main" }),
  },
  {
    id: "panel_2",
    name: "Заказы",
    icon: FileTextOutlined,
    onClick: () => router.push({ name: "orders" }),
  },
  {
    id: "panel_3",
    name: "Корзина",
    icon: ShoppingCartOutlined,
    onClick: () => {
      console.log(123);
      router.push({ name: "checkout" });
    },
  },
  {
    id: "panel_4",
    name: "Аккаунт",
    icon: UserOutlined,
    onClick: () => null,
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
    v-model:activeKey="activeKey"
  >
    <ATabPane v-for="panel in panels" :key="panel.id">
      <template #tab>
        <component :is="panel.icon" />
        {{ panel.name }}
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
</style>
