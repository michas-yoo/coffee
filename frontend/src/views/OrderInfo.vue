<script setup>
import { makeRequest } from "../api/apiClient.js";
import { SERVICE_FEE } from "../constants.js";
import { onMounted, reactive } from "vue";
import { ClockCircleOutlined, CalendarOutlined, ShopOutlined } from "@ant-design/icons-vue";
import ProductCard from "../components/ProductCard.vue";
import OrderStatus from "../components/OrderStatus.vue";

const { order } = defineProps({
  order: Object,
});

const emit = defineEmits(["close"]);

const store = reactive({
  data: {},
});

const onClose = () => emit("close");

onMounted(async () => {
  store.data = await makeRequest("getOrderById", order.id);
  console.log(order.created_at);
});
</script>

<template>
  <a-drawer
    size="large"
    placement="bottom"
    :open="true"
    :title="`Детали заказа №${order.id}`"
    :closable="true"
    @close="onClose"
  >
    <template #extra>
      <OrderStatus :status="order.status_id" />
    </template>

    <ASpin v-if="!store.data.id" />
    <div v-else class="main-layout">
      <ACard title="Дата и время заказа" class="order-info">
        <ACardGrid style="width: 50%" :hoverable="false">
          <p>
            <CalendarOutlined class="icon" />
            {{ new Date(order.created_at).toLocaleDateString() }}
          </p>
        </ACardGrid>
        <ACardGrid style="width: 50%" :hoverable="false">
          <p>
            <ClockCircleOutlined class="icon" />
            {{ new Date(order.created_at).toLocaleTimeString() }}
          </p>
        </ACardGrid>
      </ACard>
      <ACard>
        <ATypographyText>Заказ передан в кафе:</ATypographyText>
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
          <span>Сумма заказа</span>
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

.icon {
  margin-right: 5px;
}

.info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}
</style>
