<script setup>
import { makeRequest } from "../api/apiClient.js";
import { SERVICE_FEE } from "../constants.js";
import { ShopOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive } from "vue";
import ProductCard from "../components/ProductCard.vue";
import OrderStatus from "../components/OrderStatus.vue";

const { order } = defineProps({
  order: Object,
});

const store = reactive({
  data: {},
});

onMounted(async () => {
  store.data = await makeRequest("getOrderById", order.id);
  console.log(store.data);
});
</script>

<template>
  <a-drawer
    size="large"
    placement="bottom"
    :open="true"
    :title="`Детали заказа №${order.id}`"
    :closable="true"
  >
    <template #extra>
      <OrderStatus :status="store.data.status_id" />
    </template>

    <ASpin v-if="!store.data.id" />
    <div v-else class="main-layout">
      <ACard>
        <ATypographyText type="secondary">
          Заказ передан в кафе:
        </ATypographyText>
        <div class="info">
          <AButton shape="circle" size="large" class="icon">
            <ShopOutlined />
          </AButton>
          <div class="store">
            <ATypographyTitle :level="3">{{ store.data.name }}</ATypographyTitle>
            <ATypographyText>{{ store.data.geo }}</ATypographyText>
          </div>
        </div>
      </ACard>

      <ProductCard
        v-for="item in store.data.items"
        :key="item.id"
        :data="item"
        :removable="false"
      />

      <ACard title="Детали оплаты">
        <ATypographyText class="flexed sb" type="secondary">
          <span>Итоговая стоимость</span>
          <span style="color: black">{{ store.data.price - SERVICE_FEE }}₽</span>
        </ATypographyText>
        <ATypographyText class="flexed sb" type="secondary">
          <span>Работа сервиса</span>
          <span style="color: black">{{ SERVICE_FEE }}₽</span>
        </ATypographyText>
        <ADivider />
        <ATypographyTitle :level="5" class="flexed sb">
          <span>Итоговая стоимость</span>
          <span>{{ store.data.price }}₽</span>
        </ATypographyTitle>
      </ACard>
    </div>
  </a-drawer>
</template>

<style scoped>
.main-layout {
  display: grid;
  gap: 15px;
}

.info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}
</style>
