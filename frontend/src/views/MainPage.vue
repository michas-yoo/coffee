<script setup>
import { appStore } from "../store.js";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { notification } from "ant-design-vue";
import { BellOutlined } from "@ant-design/icons-vue";
import { NETWORK_ERROR_TEXT } from "../constants.js";
import { onMounted, reactive } from "vue";
import ShopsGrid from "../components/ShopsGrid.vue";

const router = useRouter();

const data = reactive({
  shops: [],
});

onMounted(async () => {
  appStore.loading = true;

  try {
    data.shops = await makeRequest("getShops");
    appStore.loading = false;
  } catch ({ message }) {
    appStore.loading = false;
    notification.error({ message });
    if (message === NETWORK_ERROR_TEXT) {
      await router.push({ name: "bad-request" });
      return;
    }

    await router.push({ name: "login" });
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
    <ShopsGrid :data="data.shops" />
  </ALayout>
</template>

<style scoped>

</style>
