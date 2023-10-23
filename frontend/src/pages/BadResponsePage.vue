<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ApiClient } from "../api/apiClient.ts";
import { handleError } from "../utils/handleError.ts";
import { NETWORK_ERROR_TEXT } from "../constants.ts";

const router = useRouter();

onMounted(async () => {
  try {
    await ApiClient.refreshToken();
    await router.push({ name: "main" });
  } catch (e: any) {
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
