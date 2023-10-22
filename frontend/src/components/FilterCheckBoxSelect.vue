<script lang="ts" setup>
import { onMounted, ref } from "vue";

const { filters } = defineProps({
  filters: [Object],
});

const emit = defineEmits(["checkbox-select"]);

const checked = ref([]);

const onUpdate = (currentValues) => {
  let finalSum = 0;
  const modifierIds = [];

  filters.forEach((filter) => {
    if (currentValues.includes(filter.name)) {
      finalSum += filter.price;
      modifierIds.push(filter.id);
    }
  });

  emit("checkbox-select", {
    ids: modifierIds.join(","),
    price: finalSum,
  });
};

onMounted(() => {
  onUpdate(checked.value);
});
</script>

<template>
  <ACheckboxGroup class="two-cols" v-model:value="checked" @change="onUpdate">
    <ACheckbox
      v-for="(filter, i) in filters"
      :key="i"
      :value="filter.name"
    >
      {{ filter.name }}, +{{ filter.price }}₽
    </ACheckbox>
  </ACheckboxGroup>
</template>

<style scoped>

</style>
