<script lang="ts" setup>
import { appStore } from "../store.ts";
import { useRouter } from "vue-router";
import { ApiClient } from "../api/apiClient.ts";
import { handleError } from "../utils/handleError.ts";
import { onMounted, ref } from "vue";
import ShopsGrid from "../components/ShopsGrid.vue";
import { IShop } from "../interfaces";

const router = useRouter();

const shops = ref<IShop[]>([]);

onMounted(async () => {
  appStore.currentPage = "main";

  try {
    shops.value = await ApiClient.getShops();
  } catch (e: any) {
    handleError(e, router);
  }
});
</script>

<template>
  <ALayout>
    <APageHeader
      class="header-column"
      :title="appStore.greeting"
      :sub-title="appStore.username"
    />
    <ShopsGrid :data="shops" />
  </ALayout>
</template>

<style scoped>

</style>
