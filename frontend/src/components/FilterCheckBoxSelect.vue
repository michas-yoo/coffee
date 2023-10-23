<script lang="ts" setup>
import { IModifier } from "../interfaces";
import { onMounted, ref } from "vue";

type FilterCheckBoxSelectProps = {
  filters: IModifier[],
};

const { filters } = defineProps<FilterCheckBoxSelectProps>();

const emit = defineEmits(["checkbox-select"]);

const checked = ref([]);

const onUpdate = (currentValues: string[]) => {
  let finalSum = 0;
  const modifierIds: number[] = [];

  filters.forEach((filter: IModifier) => {
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
