<script setup>
import { appStore } from "./store.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { makeRequest } from "./api/apiClient.js";
import { notification } from "ant-design-vue";

const router = useRouter();

onMounted(async () => {
  if (window.location.href.match(/login|register/)) {
    appStore.loading = false;
    return;
  }

  try {
    const token = await makeRequest("refreshToken");
    appStore.loading = false;
    appStore.username = token.username;
    appStore.accessToken = token.accessToken;
  } catch (message) {
    appStore.loading = false;
    notification.error({ message });
    return router.push({ name: "login" });
  }
});
</script>

<template>
  <ALayout v-if="appStore.loading">
    <ASpin size="large" />
  </ALayout>
  <ALayout v-else class="main-container">
    <router-view />
  </ALayout>
</template>

<style scoped>
.main-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
}
</style>
