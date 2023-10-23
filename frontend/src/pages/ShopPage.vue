<script lang="ts" setup>
import { appStore } from "../store.ts";
import { makeRequest } from "../api/apiClient.ts";
import { handleError } from "../utils/handleError.ts";
import { useRoute, useRouter } from "vue-router";
import { observeIntersection } from "../utils/observeIntersection.ts";
import { onMounted, reactive, ref, nextTick } from "vue";
import { ArrowLeftOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";
import ProductOrder from "../views/ProductOrder.vue";
import ProductsGrid from "../components/ProductsGrid.vue";
import { IMenuItem, IShop } from "../interfaces";

type ShopInfo = {
  data: IShop,
  menu: IMenuItem[],
};

const route = useRoute();
const router = useRouter();

const backContainer = ref<HTMLElement | null>(null);
const store = reactive<ShopInfo>({
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
  menu: [],
});

onMounted(async () => {
  const routeId = route.params.id;
  appStore.loading = true;

  try {
    store.data = await makeRequest("getShop", routeId);
    store.menu = store.data.menu;
    store.data.menu = [];
    appStore.loading = false;
  } catch (e: any) {
    appStore.loading = false;
    handleError(e, router);
    return;
  }

  const showMenuCallback = () => store.data.menu = store.menu;

  await nextTick(() => {
    if (window.innerHeight < 800) {
      observeIntersection(backContainer.value!, showMenuCallback, true);
    } else {
      showMenuCallback();
    }
  });
});
</script>

<template>
  <div>
    <ASpin size="large" v-if="!store.data.id" />
    <ALayout v-else class="shop-page-container">
      <APageHeader title=" " @back="() => router.push({ name: 'main' })">
        <template #backIcon>
          <span class="back-container" ref="backContainer" />
          <AButton shape="circle">
            <ArrowLeftOutlined />
          </AButton>
        </template>
      </APageHeader>

      <ACarousel class="photo-carousel" autoplay>
        <img :src="store.data.poster" :alt="store.data.name">
        <div v-for="photo in store.data.gallery" :key="photo.id">
          <img :src="photo.photo" :alt="`Photo ${photo.id}`">
        </div>
      </ACarousel>

      <div class="empty-space" />

      <ATypographyTitle>{{ store.data.name }}</ATypographyTitle>

      <ACard title="Часы работы и расположение" :bordered="false">
        <ACardGrid style="width: 50%" :hoverable="false">
          <p>
            <ClockCircleOutlined />
            С {{ store.data.open_time }} до {{ store.data.close_time }}
          </p>
        </ACardGrid>
        <ACardGrid style="width: 50%" :hoverable="false">
          <p>{{ store.data.geo }}</p>
        </ACardGrid>
      </ACard>

      <ATypographyTitle :level="2" style="margin: 25px 0 15px">Меню</ATypographyTitle>

      <ProductsGrid :data="store.data.menu" />
      <ASkeleton v-if="!store.data.menu.length" active :size="50" />

      <ProductOrder :shop-id="store.data.id" />
    </ALayout>
  </div>
</template>

<style scoped lang="scss">
.shop-page-container {
  position: relative;
  z-index: 1;

  &.has-checkout {
    padding-bottom: 120px;
  }
}

.photo-carousel {
  position: absolute;
  top: -20px;
  left: -20px;
  height: 350px;
  width: calc(100% + 40px);
  z-index: -1;

  img {
    max-width: 100%;
    max-height: 350px;
    object-fit: cover;
    object-position: center;
  }
}

.empty-space {
  height: 250px;
}

img {
  width: 100%;
  max-width: 300px;
}

.back-container {
  position: absolute;
  top: 4px;
  left: 0;
  width: 32px;
  height: 32px;
}
</style>
