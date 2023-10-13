<script setup>
import { appStore } from "../store.js";
import { computed } from "vue";
import { RightOutlined } from "@ant-design/icons-vue";

const cart = computed(() => ({
  elements: appStore.cart.length,
  price: appStore.cart.reduce((sum, cur) => sum + cur.price, 0),
}));
</script>

<template>
  <AButton type="primary" class="checkout-prompt flexed aic sb">
    <div class="checkout-prompt__info">
      <ATypographyText>В корзине {{ cart.elements }} шт</ATypographyText>
      <ATypographyTitle :level="3">{{ cart.price }}₽</ATypographyTitle>
    </div>
    <div class="checkout-prompt__cta flexed aic sb">
      <ATypographyTitle :level="5">В корзину</ATypographyTitle>
      <RightOutlined style="font-size: 18px" />
    </div>
  </AButton>
</template>

<style scoped lang="scss">
.checkout-prompt {
  position: fixed;
  left: 20px;
  bottom: 100px;
  width: calc(100% - 40px);
  height: auto;
  padding: 10px 10px 15px;
  text-align: left;
  border-radius: 5px;

  &__cta {
    gap: 10px;
  }

  h5 {
    margin: 0 !important;
  }
}
</style>
