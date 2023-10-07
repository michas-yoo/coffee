<script setup>
import { appStore } from "../store.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";

const router = useRouter();

onMounted(async () => {
  try {
    await makeRequest("refreshToken");
    await router.push({ name: "main" });
  } catch (e) {
    console.log(e);
  }

  appStore.loading = false;
});
</script>

<template>
  <AEmpty>
    <template #description>
      <ATypographyTitle>Не удалось подключиться к серверу...</ATypographyTitle>
      <ATypographyText>Попробуйте перезагрузить страницу</ATypographyText>
    </template>
  </AEmpty>
</template>

<style scoped>

</style>
