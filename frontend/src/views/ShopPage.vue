<script setup>
import ProductsGrid from "../components/ProductsGrid.vue";
import { makeRequest } from "../api/apiClient.js";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeftOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();

const currentShop = reactive({
  data: {
    id: 0,
    geo: "",
    name: "",
    menu: [],
    poster: "",
    gallery: [],
    open_time: "",
    close_time: "",
  },
});

onMounted(async () => {
  const routeId = route.params.id;
  currentShop.data = await makeRequest("getShop", routeId);
});
</script>

<template>
  <ASpin size="large" v-if="!currentShop.data.id" />
  <ALayout v-else class="shop-page-container">
    <APageHeader title=" " @back="() => router.push({ name: 'main' })">
      <template #backIcon>
        <AButton shape="circle">
          <ArrowLeftOutlined />
        </AButton>
      </template>
    </APageHeader>

    <ACarousel class="photo-carousel" autoplay>
      <img :src="currentShop.data.poster" :alt="currentShop.data.name">
      <div v-for="photo in currentShop.data.gallery" :key="photo.id">
        <img :src="photo.photo" :alt="`Photo ${photo.id}`">
      </div>
    </ACarousel>

    <div class="empty-space" />

    <ATypographyTitle>{{ currentShop.data.name }}</ATypographyTitle>

    <ACard title="Часы работы и расположение" :bordered="false">
      <ACardGrid style="width: 50%">
        <p>
          <ClockCircleOutlined />
          С {{ currentShop.data.open_time }} до {{ currentShop.data.close_time }}
        </p>
      </ACardGrid>
      <ACardGrid style="width: 50%">
        <p>{{ currentShop.data.geo }}</p>
      </ACardGrid>
    </ACard>

    <ATypographyTitle :level="2">Меню</ATypographyTitle>

    <ProductsGrid :data="currentShop.data.menu" />
  </ALayout>
</template>

<style scoped>
.shop-page-container {
  position: relative;
  z-index: 1;
}

.photo-carousel {
  position: absolute;
  top: -20px;
  left: -20px;
  height: 350px;
  width: calc(100% + 40px);
  z-index: -1;
}

.empty-space {
  height: 230px;
}

img {
  width: 100%;
  max-width: 300px;
}

.photo-carousel img {
  max-width: 100%;
  max-height: 350px;
  object-fit: cover;
  object-position: center;
}
</style>
