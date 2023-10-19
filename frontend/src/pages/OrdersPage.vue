<script setup>
import { useRouter } from "vue-router";
import { STATUS_DONE } from "../constants.js";
import { makeRequest } from "../api/apiClient.js";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import OrderInfo from "../views/OrderInfo.vue";
import OrderCard from "../components/OrderCard.vue";
import { appStore } from "../store.js";

const router = useRouter();

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
  appStore.currentPage = "orders";
  orders.value = await makeRequest("getOrders");
});
</script>

<template>
  <ALayout>
    <APageHeader title="Заказы" @back="() => router.push({ name: 'main' })">
      <template #backIcon>
        <AButton shape="circle">
          <ArrowLeftOutlined />
        </AButton>
      </template>
    </APageHeader>
    <ATabs
      size="large"
      class="tab-bar"
      @change="onPanelChange"
      v-model:activeKey="activeKey"
    >
      <ATabPane key="1" tab="Активные">
        <transition-group name="slide" appear>
          <OrderCard
            v-for="order in orders.filter((o) => o.status_id < STATUS_DONE)"
            :key="order.id"
            :order="order"
            @select="onShowOrderInfo"
          />
        </transition-group>
      </ATabPane>
      <ATabPane key="2" tab="Завершенные" :disabled="!doneOrders.length">
        <transition-group name="slide" appear>
          <OrderCard
            v-for="order in doneOrders"
            :key="order.id"
            :order="order"
            @select="onShowOrderInfo"
          />
        </transition-group>
      </ATabPane>
    </ATabs>
    <OrderInfo
      :order="selectedOrder"
      @close="onCloseOrderInfo"
    />
  </ALayout>
</template>

<style scoped>

</style>
