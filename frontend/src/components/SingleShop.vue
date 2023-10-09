<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const { data, orderNum } = defineProps({
  data: Object,
  orderNum: Number,
});

const onClick = () => {
  router.push({ name: "shop", params: { id: data.id } });
};
</script>

<template>
  <ACard
    hoverable
    :style="{
      width: '100%',
      transitionDelay: `${0.08 * orderNum}s`
    }"
    @click="onClick"
  >
    <template #cover>
      <img :src="data.poster" :alt="data.name">
    </template>
    <ACardMeta :title="data.name">
      <template #description>
        {{ data.geo }}
      </template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>

</style>
