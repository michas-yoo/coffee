<script setup>
import { useRouter } from "vue-router";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { appStore } from "../store.js";
import { notification } from "ant-design-vue";
import { makeRequest } from "../api/apiClient.js";

const router = useRouter();

onMounted(async () => {
  try {
    appStore.cart = await makeRequest("getCart");
  } catch (e) {
    console.log(e);
    notification.error(e);
  }

  console.log(appStore.cart);
});
</script>

<template>
  <ALayout>
    <APageHeader title="Корзина" @back="() => router.push({ name: 'main' })">
      <template #backIcon>
        <AButton shape="circle">
          <ArrowLeftOutlined />
        </AButton>
      </template>
    </APageHeader>
    <ACard
      v-for="item in appStore.cart"
      :key="item.id"
      :title="item.product.name"
      class="item-card"
    >
      <div class="item-container">
        <div class="poster">
          <img :src="item.product.photo" :alt="item.product.name">
        </div>
        <div class="info">
          <ATypographyTitle :level="3">{{ item.amount }} шт</ATypographyTitle>
          <ADivider />
          <ASpace direction="vertical" style="width: 100%">
            <ATypographyText class="flexed sb">
              <span style="font-weight: bold">Базовая цена</span>
              <span style="font-weight: bold">{{ item.product.price }}₽</span>
            </ATypographyText>
            <ATypographyText
              v-for="modifier in item.modifiers"
              :key="modifier.id"
              type="secondary"
              class="flexed sb"
            >
              <span>{{ modifier.name }}</span>
              <span>+ {{ modifier.price }}₽</span>
            </ATypographyText>
            <ATypographyText class="flexed sb">
              <span style="font-weight: bold">Итого</span>
              <span style="font-weight: bold">{{ item.price }}₽</span>
            </ATypographyText>
          </ASpace>
        </div>
      </div>
    </ACard>
  </ALayout>
</template>

<style scoped>
.item-container {
  display: flex;
  gap: 15px;
}

.poster {
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #eeeeee;
}

.poster img {
  width: 80px;
  height: 100px;
}

.info {
  flex: 1;
}
</style>
