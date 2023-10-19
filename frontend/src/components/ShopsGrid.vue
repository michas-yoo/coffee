<script setup>
import SingleShop from "./SingleShop.vue";

const { data } = defineProps({
  data: [Object],
});
</script>

<template>
  <div class="shops-container">
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
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  overflow-x: hidden;
}
</style>
