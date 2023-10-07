<script setup>
import { appStore } from "../store.js";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { notification } from "ant-design-vue";
import { BellOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive } from "vue";
import ShopsGrid from "../components/ShopsGrid.vue";

const router = useRouter();

const data = reactive({
  shops: [],
});

onMounted(async () => {
  try {
    data.shops = await makeRequest("getShops");
    appStore.loading = false;
  } catch ({ message }) {
    notification.error({ message });
    if (message === "Failed to fetch") {
      await router.push({ name: "bad-request" });
    }
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
        <AButton shape="circle">
          <BellOutlined />
        </AButton>
      </template>
    </APageHeader>
    <ShopsGrid :data="data.shops" />
  </ALayout>
</template>

<style scoped>

</style>
