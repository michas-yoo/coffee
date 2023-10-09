<script setup>
import { ref } from "vue";

const emit = defineEmits(["update"]);
const { min, max, initial } = defineProps({
  min: Number,
  max: Number,
  initial: Number,
});

const value = ref(initial);

const onIncrease = () => {
  value.value = Math.min(value.value + 1, max);
  emit("update", value.value);
};

const onDecrease = () => {
  value.value = Math.max(value.value - 1, min);
  emit("update", value);
};
</script>

<template>
  <div class="amount-selector">
    <AButton @click="onDecrease">–</AButton>
    <ATypographyText class="price">{{ value }}</ATypographyText>
    <AButton @click="onIncrease">+</AButton>
  </div>
</template>

<style scoped>
.amount-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  width: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
