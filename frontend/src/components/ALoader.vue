<script setup lang="ts">

</script>

<template>
  <div class="loading">
    <ASpin size="large" />
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  backdrop-filter: blur(5px);
  z-index: 10;
}
</style>
