<script setup>
import { appStore } from "../store.js";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { displayError } from "../utils/displayError.js";
import { BellOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { NETWORK_ERROR_TEXT } from "../constants.js";
import ShopsGrid from "../components/ShopsGrid.vue";

const router = useRouter();

const shops = ref([]);

onMounted(async () => {
  appStore.loading = true;

  try {
    shops.value = await makeRequest("getShops");
    appStore.loading = false;
  } catch ({ message }) {
    appStore.loading = false;
    displayError(message);
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
    <ShopsGrid :data="shops" />
  </ALayout>
</template>

<style scoped>

</style>
