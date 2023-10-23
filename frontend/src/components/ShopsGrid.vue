<script lang="ts" setup>
import { IShop } from "../interfaces";
import SingleShop from "./SingleShop.vue";

type ShopsGridProps = {
  data: IShop[],
};

const { data } = defineProps<ShopsGridProps>();
</script>

<template>
  <div class="grid-container shops-container">
    <transition-group name="slide">
      <SingleShop
        v-for="(shop, i) in data"
        :key="shop.id"
        :data="shop"
        :order-num="i"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.shops-container {
  position: relative;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  overflow-x: hidden;
}
</style>
