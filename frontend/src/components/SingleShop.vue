<script lang="ts" setup>
import { useRouter } from "vue-router";
import { IShop } from "../interfaces";

type SingleShopProps = {
  data: IShop,
  orderNum: number,
};

const { data, orderNum } = defineProps<SingleShopProps>();

const router = useRouter();

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
