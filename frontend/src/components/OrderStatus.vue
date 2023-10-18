<script setup>
const { status } = defineProps({
  status: Number,
});

const STATUSES_DICT = {
  1: {
    title: "Принят",
    color: "orange",
  },
  2: {
    title: "Готовится",
    color: "blue",
  },
  3: {
    title: "Готов",
    color: "green",
  },
  4: {
    title: "Выполнен",
    color: "purple",
  },
};
</script>

<template>
  <ATag
    :color="STATUSES_DICT[status].color"
  >
    {{ STATUSES_DICT[status].title }}
  </ATag>
</template>

<style scoped>

</style>
