<script lang="ts" setup>
import { IShop } from "../interfaces";
import { useRouter } from "vue-router";
import { ApiClient } from "../api/apiClient.ts";
import { handleError } from "../utils/handleError.ts";
import { getGreeting } from "../utils/getGreeting.ts";
import { useAppStore } from "../stores/AppStore.ts";
import { useUserStore } from "../stores/UserStore.ts";
import { onMounted, ref } from "vue";
import ShopsGrid from "../components/ShopsGrid.vue";

const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();

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
      :title="getGreeting()"
      :sub-title="userStore.username"
    />
    <ShopsGrid :data="shops" />
  </ALayout>
</template>

<style scoped>

</style>
