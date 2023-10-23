<script lang="ts" setup>
import { Modal } from "ant-design-vue";
import { appStore } from "../store.ts";
import { useRouter } from "vue-router";
import { ICartItem } from "../interfaces";
import { ApiClient } from "../api/apiClient.ts";
import { getSumByKey } from "../utils/getSumByKey.ts";
import { handleError } from "../utils/handleError.ts";
import { SERVICE_FEE } from "../constants.ts";
import { ShopOutlined } from "@ant-design/icons-vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { computed, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";

const router = useRouter();

const cartItems = computed(() => appStore.cart);

const grandTotal = computed(() => getSumByKey(cartItems.value, "price"));

const onRemove = async (id: number) => {
  await ApiClient.removeFromCart(id);
  appStore.cart = appStore.cart.filter((item) => item.id !== id);
};

const onOrder = async () => {
  try {
    const requestCart = cartItems.value.map((item: ICartItem) => ({
      amount: item.amount,
      comment: item.comment,
      shop_id: item.shop_id,
      user_id: item.user_id,
      product_id: item.product_id,
      modifier_ids: item.modifier_ids,
    }));

    await ApiClient.createOrder({
      cart: requestCart,
      total: grandTotal.value + SERVICE_FEE,
    });
    Modal.success({
      title: "Заказ успешно создан",
      content: "Переходим на его страницу...",
      onOk: () => router.push({ name: "orders" }),
    });
    setTimeout(() => {
      router.push({ name: "orders" });
    }, 2000);
  } catch (e: any) {
    handleError(e, router);
  }
};

onMounted(async () => {
  appStore.loading = true;
  appStore.currentPage = "checkout";

  try {
    appStore.cart = await ApiClient.getCart();
    appStore.loading = false;
  } catch (e: any) {
    appStore.loading = false;
    handleError(e, router);
  }
});
</script>

<template>
  <ALayout>
    <APageHeader title="Корзина" @back="() => router.push({ name: 'main' })">
      <template #backIcon>
        <AButton shape="circle">
          <ArrowLeftOutlined />
        </AButton>
      </template>
    </APageHeader>

    <div class="grid-container" v-if="cartItems.length">
      <ACard>
        <ATypographyText type="secondary">Заказ можно забрать по адресу:</ATypographyText>
        <div class="container flexed aic">
          <AButton shape="circle" size="large" class="icon">
            <ShopOutlined />
          </AButton>
          <div class="info">
            <ATypographyTitle :level="3">{{ cartItems[0]?.shop.name }}</ATypographyTitle>
            <ATypographyText type="secondary">{{ cartItems[0]?.shop.geo }}</ATypographyText>
          </div>
        </div>
      </ACard>

      <transition-group appear name="slide">
        <ProductCard
          v-for="(item, index) in cartItems"
          :key="item.id"
          :data="item"
          :index="index"
          :removable="true"
          @remove="onRemove"
        />
      </transition-group>

      <ACard title="Детали заказа">
        <div class="flexed aic sb">
          <ATypographyText type="secondary">Сумма заказа</ATypographyText>
          <ATypographyText>{{ grandTotal }}₽</ATypographyText>
        </div>
        <div class="flexed aic sb">
          <ATypographyText type="secondary">Работа сервиса</ATypographyText>
          <ATypographyText>{{ SERVICE_FEE }}₽</ATypographyText>
        </div>
        <ADivider />
        <div class="flexed aic sb">
          <ATypographyText strong>Итого</ATypographyText>
          <ATypographyText strong>{{ grandTotal + SERVICE_FEE }}₽</ATypographyText>
        </div>
      </ACard>
    </div>
    <AEmpty v-else>
      <template #description>
        Корзина пока пуста!
      </template>
    </AEmpty>

    <div style="width: 100%" v-if="cartItems.length">
      <ADivider />
      <AButton
        size="large"
        type="primary"
        @click="onOrder"
        style="width: 100%"
      >
        Заказать
      </AButton>
    </div>
  </ALayout>
</template>

<style scoped>
.container {
  margin-top: 15px;
}

.icon {
  margin-right: 15px;
}

h3 {
  margin-top: 0;
}
</style>
