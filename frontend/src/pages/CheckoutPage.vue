<script setup>
import { Modal } from "ant-design-vue";
import { appStore } from "../store.js";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { getSumByKey } from "../utils/getSumByKey.js";
import { SERVICE_FEE } from "../constants.js";
import { ShopOutlined } from "@ant-design/icons-vue";
import { displayError } from "../utils/displayError.js";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { computed, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";

const router = useRouter();

const cartItems = computed(() => appStore.cart);

const grandTotal = computed(() => getSumByKey(cartItems.value, "price"));

const onRemove = async (id) => {
  await makeRequest("removeFromCart", { id });
  appStore.cart = await makeRequest("getCart");
};

const onOrder = async () => {
  try {
    const requestCart = cartItems.value.map((item) => {
      const { shop_id, user_id, product_id, modifier_ids, amount, comment } = item;

      return {
        amount,
        comment,
        shop_id,
        user_id,
        product_id,
        modifier_ids,
      };
    });

    await makeRequest("createOrder", {
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
  } catch (e) {
    displayError(e);
  }
};

onMounted(async () => {
  try {
    appStore.cart = await makeRequest("getCart");
  } catch (e) {
    displayError(e);
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

    <div class="checkout-list" v-if="cartItems.length">
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

      <ProductCard
        v-for="item in cartItems"
        :key="item.id"
        :data="item"
        @remove="onRemove"
      />

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
.checkout-list {
  display: grid;
  gap: 20px;
}

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
