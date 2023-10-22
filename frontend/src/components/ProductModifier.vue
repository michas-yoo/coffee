<script lang="ts" setup>
import FilterRadioSelect from "./FilterRadioSelect.vue";
import FilterCheckBoxSelect from "./FilterCheckBoxSelect.vue";
import { IProductModifier, Money } from "../interfaces";

type ProductModifierProps = {
  data: IProductModifier,
  divider: boolean,
};

type ModifierUpdataData = {
  ids: string,
  price: Money,
};

const { data, divider } = withDefaults(defineProps<ProductModifierProps>(), {
  divider: true,
});

const emit = defineEmits(["modifier-update"]);

const onModifierUpdate = ({ ids, price }: ModifierUpdataData) => {
  emit("modifier-update", {
    ids,
    price,
    name: data.name,
  });
};
</script>

<template>
  <ADivider v-if="divider" />
  <div class="modifier-selection">
    <ATypographyTitle :level="3">{{ data.name }}</ATypographyTitle>
    <FilterCheckBoxSelect
      v-if="data.multipleSelect"
      :filters="data.modifiers"
      @checkbox-select="onModifierUpdate"
    />
    <FilterRadioSelect
      v-else
      :filters="data.modifiers"
      @radio-select="onModifierUpdate"
    />
  </div>
</template>

<style scoped>

</style>
