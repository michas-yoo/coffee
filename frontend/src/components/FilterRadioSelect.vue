<script setup>
import { onMounted, ref } from "vue";

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

onMounted(() => {
  onUpdate();
});
</script>

<template>
  <ARadioGroup
    class="two-cols"
    :class="{
      'three-cols': filters.length <= 3,
    }"
    v-model:value="current"
    @change="onUpdate"
  >
    <ARadio
      v-for="(radio, i) in filters"
      :key="i"
      :value="i"
    >
      {{ radio.name }}<span v-if="radio.price">, +{{ radio.price }}₽</span>
    </ARadio>
  </ARadioGroup>
</template>

<style scoped>
.three-cols {
  grid-template-columns: repeat(3, 1fr);
}
</style>
