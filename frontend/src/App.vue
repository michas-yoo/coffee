<script setup>
import { appStore } from "./store.js";
import { useRoute } from "vue-router";

const route = useRoute();
const isSafePage = route.matched.some((record) => record.name.match(/login|register/gi))
const isLoading = appStore.loading && isSafePage;
</script>

<template>
  <ASpin class="main-spinner" v-if="isLoading" size="large" />
  <ALayout class="main-container">
    <router-view />
  </ALayout>
</template>

<style scoped>
.main-spinner {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  backdrop-filter: blur(5px);
  z-index: 5;
}

.main-container {
  width: 100%;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
}
</style>
