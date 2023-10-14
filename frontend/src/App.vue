<script setup>
import { appStore } from "./store.js";
import { useRoute } from "vue-router";
import { makeRequest } from "./api/apiClient.js";
import { computed, onMounted } from "vue";
import TheTabBar from "./components/TheTabBar.vue";

const route = useRoute();
const isSafePage = computed(() => route.matched
  .some((record) => record.name.match(/login|register|bad/gi)),
);
const isLoading = computed(() => appStore.loading && isSafePage);

onMounted(async () => {
  if (route.matched.some((record) => record.name.match(/checkout/))) {
    appStore.cart.push(await makeRequest("getCart"));
  }
});
</script>

<template>
  <ASpin class="main-spinner" v-if="isLoading" size="large" />
  <ALayout class="main-container" :class="isSafePage ? 'no-paddings' : ''">
    <router-view />
  </ALayout>
  <TheTabBar v-if="appStore.accessToken" />
</template>

<style scoped lang="scss">
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
  padding: 20px 20px 92px;

  &.no-paddings {
    padding: 0;
    min-height: 100vh;
  }
}
</style>
