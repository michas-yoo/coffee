<script lang="ts" setup>
import SingleProduct from "./SingleProduct.vue";
import { IMenuItem } from "../interfaces";

type ProductsGridProps = {
  data: IMenuItem[],
};

const { data } = defineProps<ProductsGridProps>();
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
