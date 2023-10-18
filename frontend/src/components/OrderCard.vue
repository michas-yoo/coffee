<script setup>
import { RightOutlined, ShopOutlined } from "@ant-design/icons-vue";
import OrderStatus from "./OrderStatus.vue";

const { order } = defineProps({
  order: Object,
});

const emit = defineEmits(["select"]);

const onClick = (id) => emit("select", id);
</script>

<template>
  <ACard @click="() => onClick(order.id)" hoverable>
    <div class="item-container">
      <div class="poster">
        <img :src="order.items[0]?.photo" :alt="order.items[0].name">
      </div>
      <div class="info">
        <ATypographyTitle :level="2">
          Заказ от {{ new Date(order.created_at).toLocaleDateString() }}
        </ATypographyTitle>
        <ATypographyText>
          {{ order.items.length }} шт.
        </ATypographyText>
        <ATypographyText type="secondary">
          <ShopOutlined />
          {{ order.shop.name }}
        </ATypographyText>
        <OrderStatus :status="order.status_id" />
      </div>
      <div class="go">
        <RightOutlined style="font-size: 18px" />
      </div>
    </div>
  </ACard>
</template>

<style scoped>
.item-container {
  display: flex;
  gap: 24px;
}

.poster {
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #eeeeee;
}

.poster img {
  width: 80px;
  height: 100px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
}

.info h2 {
  margin-bottom: 0;
}

.go {
  display: grid;
  place-items: center;
}

@media screen and (max-width: 450px) {
  .item-container {
    flex-wrap: wrap;
  }

  .info {
    min-width: 80%;
  }
}
</style>
