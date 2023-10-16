<script setup>
import { onMounted, ref } from "vue";
import { makeRequest } from "../api/apiClient.js";

const orders = ref([]);

onMounted(async () => {
  orders.value = await makeRequest("getOrders");
});

console.log(orders.value);
</script>

<template>
  <div>
    hello, we are orders
  </div>
</template>

<style scoped>

</style>
