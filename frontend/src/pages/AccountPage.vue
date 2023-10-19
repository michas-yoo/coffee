<script setup>
import { onMounted } from "vue";
import { appStore } from "../store.js";

onMounted(() => {
  appStore.currentPage = "account";
});
</script>

<template>
  <ALayout>
    hello this is account
  </ALayout>
</template>

<style scoped>

</style>
