<script setup>
import { ref } from "vue";

const { filters } = defineProps({
  filters: [Object],
});

const emit = defineEmits(["checkbox-select"]);

const checked = ref([]);

const onUpdate = (currentValues) => {
  let finalSum = 0;
  const modifierIds = [];

  filters.forEach((filter) => {
    if (currentValues.includes(filter.title)) {
      finalSum += filter.price;
      modifierIds.push(filter.id);
    }
  });

  emit("checkbox-select", {
    ids: modifierIds.join(","),
    price: finalSum,
  });
};
</script>

<template>
  <ACheckboxGroup v-model:value="checked" @change="onUpdate">
    <ACheckbox
      v-for="(filter, i) in filters"
      :key="i"
      :value="filter.title"
    >
      {{ filter.title }}, +{{ filter.price }}₽
    </ACheckbox>
  </ACheckboxGroup>
</template>

<style scoped>

</style>
