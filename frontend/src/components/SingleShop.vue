<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  data: Object,
  orderId: Number,
});

const onClick = () => {
  router.push({ name: "shop", params: { id: props.data.id } });
};
</script>

<template>
  <ACard
    hoverable
    :style="{
      width: '100%',
      transitionDelay: `${0.08 * props.orderNum}s`
    }"
    @click="onClick"
  >
    <template #cover>
      <img :src="props.data.poster" :alt="props.data.name">
    </template>
    <ACardMeta :title="props.data.name">
      <template #description>
        {{ props.data.geo }}
      </template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>

</style>
