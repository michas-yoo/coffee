<script setup>
import { appStore } from "../store.js";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { handleError } from "../utils/handleError.js";
import { BellOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import ShopsGrid from "../components/ShopsGrid.vue";

const router = useRouter();

const shops = ref([]);

onMounted(async () => {
  appStore.currentPage = "main";

  try {
    shops.value = await makeRequest("getShops");
  } catch ({ message }) {
    handleError(message, router);
  }
});
</script>

<template>
  <ALayout>
    <APageHeader
      class="header-column"
      :title="appStore.time"
      :sub-title="appStore.username"
    >
      <template #extra>
        <AButton shape="circle" size="large">
          <BellOutlined />
        </AButton>
      </template>
    </APageHeader>
    <ShopsGrid :data="shops" />
  </ALayout>
</template>

<style scoped>

</style>
