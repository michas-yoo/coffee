<script setup>
import { appStore } from "../store.js";
import { onMounted, reactive } from "vue";
import { notification } from "ant-design-vue";
import { makeRequest } from "../api/apiClient.js";
import ShopsGrid from "../components/ShopsGrid.vue";
import { BellOutlined } from "@ant-design/icons-vue";

const data = reactive({
  shops: [],
});

onMounted(async () => {
  try {
    data.shops = await makeRequest("getShops");
  } catch (message) {
    notification.error({ message });
  }
});
</script>

<template>
  <ALayout>
    <APageHeader
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
