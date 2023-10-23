<script lang="ts" setup>
import { appStore } from "../store.ts";
import { useRouter } from "vue-router";
import { ApiClient } from "../api/apiClient.ts";
import { STATUS_DONE } from "../constants.ts";
import { DEFAULT_ORDER } from "../defaults.ts";
import { IOrder, OrderData } from "../interfaces";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import OrderInfo from "../views/OrderInfo.vue";
import OrderCard from "../components/OrderCard.vue";

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
  orders.value = await ApiClient.getOrders();
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
        <div class="grid-container">
          <transition-group name="slide" appear>
            <OrderCard
              v-for="order in orders.filter((o) => o.status_id < STATUS_DONE && o.items.length)"
              :key="order.id"
              :order="order"
              @select="onShowOrderInfo"
            />
          </transition-group>
        </div>
      </ATabPane>
      <ATabPane key="2" tab="Завершенные" :disabled="!doneOrders.length">
        <div class="grid-container">
          <transition-group name="slide" appear>
            <OrderCard
              v-for="order in doneOrders"
              :key="order.id"
              :order="order"
              @select="onShowOrderInfo"
            />
          </transition-group>
        </div>
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
