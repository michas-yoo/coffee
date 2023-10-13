<script setup>
import { ref } from "vue";

const { filters } = defineProps({
  filters: [Object],
});

const emit = defineEmits(["radio-select"]);

const current = ref(0);

const onUpdate = () => {
  const { id, price } = filters[current.value];
  emit("radio-select", {
    ids: id.toLocaleString(),
    price,
  });
};
</script>

<template>
  <ARadioGroup v-model:value="current" @change="onUpdate">
    <ARadio
      v-for="(radio, i) in filters"
      :key="i"
      :value="i"
    >
      {{ radio.title }}<span v-if="radio.price">, +{{ radio.price }}₽</span>
    </ARadio>
  </ARadioGroup>
</template>

<style scoped>

</style>
