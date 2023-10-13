<script setup>
import { ref } from "vue";
import { HomeOutlined, FileTextOutlined, UserOutlined } from "@ant-design/icons-vue";

const activeKey = ref("panel_1");
const panels = [
  {
    id: 'panel_1',
    name: "Главная",
    icon: HomeOutlined,
    onClick: () => null,
  },
  {
    id: 'panel_2',
    name: "Заказы",
    icon: FileTextOutlined,
    onClick: () => null,
  },
  {
    id: 'panel_3',
    name: "Аккаунт",
    icon: UserOutlined,
    onClick: () => null,
  },
];
</script>

<template>
  <ATabs class="tab-bar" size="large" v-model:activeKey="activeKey">
    <ATabPane v-for="panel in panels" :key="panel.id" @click="panel.onClick">
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
