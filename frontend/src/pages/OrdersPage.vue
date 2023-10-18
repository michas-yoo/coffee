<script setup>
import { STATUS_DONE } from "../constants.js";
import { makeRequest } from "../api/apiClient.js";
import { computed, onMounted, reactive, ref } from "vue";
import OrderCard from "../components/OrderCard.vue";
import OrderInfo from "../views/OrderInfo.vue";

const orders = ref([]);
const activeKey = ref("1");
const selectedOrder = reactive({
  data: {},
});

const doneOrders = computed(() => orders.value.filter((o) => o.status_id === STATUS_DONE));

const onPanelChange = (tab) => {
  console.log(tab);
};

const onShowOrderInfo = (id) => {
  selectedOrder.data = orders.value.find((order) => order.id === id);
};

const onCloseOrderInfo = () => selectedOrder.data = {};

onMounted(async () => {
  orders.value = await makeRequest("getOrders");
});
</script>

<template>
  <ALayout>
    <APageHeader title="Заказы" />
    <ATabs
      size="large"
      class="tab-bar"
      @change="onPanelChange"
      v-model:activeKey="activeKey"
    >
      <ATabPane key="1" tab="Активные">
        <OrderCard
          v-for="order in orders.filter((o) => o.status_id < STATUS_DONE)"
          :key="order.id"
          :order="order"
          @select="onShowOrderInfo"
        />
      </ATabPane>
      <ATabPane key="2" tab="Завершенные" :disabled="!doneOrders.length">
        <OrderCard
          v-for="order in doneOrders"
          :key="order.id"
          :order="order"
          @select="onShowOrderInfo"
        />
      </ATabPane>
    </ATabs>
    <OrderInfo
      v-if="selectedOrder.data.id"
      :order="selectedOrder.data"
      @close="onCloseOrderInfo"
    />
  </ALayout>
</template>

<style scoped>

</style>
