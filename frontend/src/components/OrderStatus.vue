<script lang="ts" setup>
type OrderStatusProps = {
  status: number,
};

type StatusesDict = {
  [key: number]: {
    title: string,
    color: string,
  }
};

const { status } = defineProps<OrderStatusProps>();

const STATUSES_DICT: StatusesDict = {
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
