<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { IModifier } from "../interfaces";

type FilterRadioSelectProps = {
  filters: IModifier[],
};

const { filters } = defineProps<FilterRadioSelectProps>();

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
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
}
</style>
