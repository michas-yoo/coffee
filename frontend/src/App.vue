<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "./stores/AppStore.ts";
import ALoader from "./components/ALoader.vue";
import TheTabBar from "./components/TheTabBar.vue";

const route = useRoute();
const appStore = useAppStore();

const hasTabBar = computed(() => route.matched
  .some((record) => {
    // @ts-ignore
    return !record.name.match(/login|register|bad/gi);
  }),
);
</script>

<template>
  <ALoader v-if="appStore.loading" />
  <ALayout class="main-container" :class="hasTabBar ? '' : 'no-paddings'">
    <router-view />
  </ALayout>
  <TheTabBar v-if="hasTabBar" />
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 20px 20px 100px;

  &.no-paddings {
    padding: 0;
    min-height: 100vh;
  }
}
</style>
