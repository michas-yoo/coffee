<script setup>
import SingleProduct from "./SingleProduct.vue";

const { data } = defineProps({
  data: [Object],
});
</script>

<template>
  <div class="products-container">
    <transition-group appear name="slide">
      <SingleProduct
        v-for="(product, i) in data"
        :key="product.id"
        :data="product"
        :order-num="i"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.products-container {
  position: relative;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  overflow-x: hidden;
}
</style>
