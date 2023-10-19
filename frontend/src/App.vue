<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheTabBar from "./components/TheTabBar.vue";

const route = useRoute();
const isSafePage = computed(() => route.matched
  .some((record) => record.name.match(/login|register|bad/gi)),
);
</script>

<template>
  <ALayout class="main-container" :class="isSafePage ? 'no-paddings' : ''">
    <router-view />
  </ALayout>
  <TheTabBar />
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
