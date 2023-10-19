<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { handleError } from "../utils/handleError.js";
import { NETWORK_ERROR_TEXT } from "../constants.js";

const router = useRouter();

onMounted(async () => {
  try {
    await makeRequest("refreshToken");
    await router.push({ name: "main" });
  } catch (e) {
    console.log(e);

    if (e !== NETWORK_ERROR_TEXT) {
      handleError(e);
      await router.push({ name: "main" });
    }
  }
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
