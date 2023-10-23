<script lang="ts" setup>
import { useRouter } from "vue-router";
import { STATUS_DONE } from "../constants.ts";
import { makeRequest } from "../api/apiClient.ts";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import OrderInfo from "../views/OrderInfo.vue";
import OrderCard from "../components/OrderCard.vue";
import { appStore } from "../store.ts";
import { IOrder, OrderData } from "../interfaces";
import { DEFAULT_ORDER } from "../defaults.ts";

const router = useRouter();

const orders = ref<IOrder[]>([]);
const activeKey = ref("1");
const selectedOrder = reactive<OrderData>({
  data: { ...DEFAULT_ORDER },
});

const doneOrders = computed(() => orders.value.filter((o) => o.status_id === STATUS_DONE));

const onShowOrderInfo = (id: number) => {
  selectedOrder.data = orders.value.find((order: IOrder) => order.id === id)!;
};

const onCloseOrderInfo = () => selectedOrder.data = { ...DEFAULT_ORDER };

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
      :id="selectedOrder.data.id"
      :status-id="selectedOrder.data.status_id"
      @close="onCloseOrderInfo"
    />
  </ALayout>
</template>

<style scoped>

</style>
