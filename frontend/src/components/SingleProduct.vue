<script setup>
import { appStore } from "../store.js";

const { data, orderNum } = defineProps({
  data: Object,
  orderNum: Number,
});

const onProductSelect = () => appStore.selectedProductId = data.id;
</script>

<template>
  <ACard
    hoverable
    :style="{
      transitionDelay: `${0.08 * orderNum}s`,
    }"
    @click="onProductSelect"
  >
    <template #cover>
      <div
        class="poster"
        :style="{
        backgroundImage: `url(${data.photo})`,
      }"
      />
    </template>
    <ACardMeta :title="data.name">
      <template #description>
        <ATypographyText type="success">{{ data.price }}₽</ATypographyText>
      </template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>
.poster {
  width: 100%;
  height: 220px;
  padding: 20px;
  background-size: contain;
  background-color: #eeeeee;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center center;
}
</style>
