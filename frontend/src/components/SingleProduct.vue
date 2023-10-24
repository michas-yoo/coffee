<script lang="ts" setup>
import { IMenuItem } from "../interfaces";
import { useAppStore } from "../stores/AppStore.ts";

type SingleProductProps = {
  data: IMenuItem,
  orderNum: number,
};

const { data, orderNum } = defineProps<SingleProductProps>();

const appStore = useAppStore();

const onProductSelect = () => appStore.productId = data.id;
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
