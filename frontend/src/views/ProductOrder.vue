<script setup>
import { appStore } from "../store.js";
import { makeRequest } from "../api/apiClient.js";
import { notification } from "ant-design-vue";
import { computed, onMounted, reactive } from "vue";
import AmountSelector from "../components/AmountSelector.vue";
import { MODIFIERS, DEFAULT_PRODUCT_ID } from "../constants.js";

const props = defineProps({
  id: Number,
  shopId: Number,
});

const store = reactive({
  data: {
    id: 0,
    name: "",
    photo: "",
    price: 0,
    modifiers: {},
    can_be_iced: 0,
    has_modifiers: 0,
    modifier_types: [],
    modifier_titles: [],
  },
  sum: 0,
  amount: 1,
  notes: "",
});

const finalSum = computed(() => store.sum * store.amount);

const onUpdateAmount = (newValue) => store.amount = newValue;

const onClose = () => {
  appStore.selectedProductId = DEFAULT_PRODUCT_ID;
};

onMounted(async () => {
  try {
    store.data = await makeRequest("getProductInfo", {
      id: props.id,
      shopId: props.shopId,
    });
    const modifiers = store.data.modifiers;
    // TODO: подумай как реализовать модификаторы
    store.data.modifiers = {
      size: modifiers.filter((mod) => mod.type === MODIFIERS.SIZE),
      milk: modifiers.filter((mod) => mod.type === MODIFIERS.MILK).map((mod) => ({ ...mod, checked: false })),
      syrup: modifiers.filter((mod) => mod.type === MODIFIERS.SYRUP).map((mod) => ({ ...mod, checked: false })),
      topping: modifiers.filter((mod) => mod.type === MODIFIERS.TOPPING).map((mod) => ({ ...mod, checked: false })),
    };
    store.sum = store.data.price;
  } catch (e) {
    console.log(e);
    notification.error({ message: e });
  }
});
// TODO: выдели компонент для фильтра, вынеси данные в него
</script>

<template>
  <a-drawer
    size="large"
    placement="bottom"
    :open="true"
    :closable="true"
    @close="onClose"
  >
    <div class="image-container">
      <img class="main-image" :src="store.data.photo" :alt="store.data.name" />
    </div>

    <ATypographyTitle>{{ store.data.name }}</ATypographyTitle>
    <div class="flexed aic sb">
      <ATypographyTitle style="margin: 0;" :level="4">
        {{ store.data.price }}₽
      </ATypographyTitle>
      <AmountSelector @update="onUpdateAmount" :initial="1" :min="1" :max="10" />
    </div>

    <div class="temperature-selection">
      <ADivider />
      <ATypographyTitle :level="3">Температура</ATypographyTitle>
      <AButton>Теплый</AButton>
      <AButton>Со льдом</AButton>
    </div>

    <div class="size-selection">
      <ADivider />
      <ATypographyTitle :level="3">Размер</ATypographyTitle>
      <AButton size="large" v-for="size in store.data.modifiers.size" :key="size.id">
        <span style="font-weight: bold">{{ size.title }}, +{{ size.price }}₽</span>
      </AButton>
    </div>

    <div class="milk-selection" v-if="store.data.modifiers.milk">
      <ADivider />
      <ATypographyTitle :level="3">Молоко</ATypographyTitle>
      <div
        :key="milk.id"
        v-for="milk in store.data.modifiers.milk"
      >
        <ARadio v-model:cheched="milk.checked">
          {{ milk.title }}, +{{ milk.price }}₽
        </ARadio>
      </div>
    </div>


    <div class="syrup-selection" v-if="store.data.modifiers.syrup">
      <ADivider />
      <ATypographyTitle :level="3">Сироп</ATypographyTitle>
      <div
        :key="syrup.id"
        v-for="syrup in store.data.modifiers.syrup"
      >
        <ARadio v-model:cheched="syrup.checked">
          {{ syrup.title }}, +{{ syrup.price }}₽
        </ARadio>
      </div>
    </div>


    <div class="topping-selection" v-if="store.data.modifiers.topping">
      <ADivider />
      <ATypographyTitle :level="3">Топпинг</ATypographyTitle>
      <div
        :key="topping.id"
        v-for="topping in store.data.modifiers.topping"
      >
        <ARadio v-model:cheched="topping.checked">
          {{ topping.title }}, +{{ topping.price }}₽
        </ARadio>
      </div>
    </div>

    <div class="notes-container">
      <ADivider />
      <ATextarea
        size="large"
        allow-clear
        placeholder="Например: поменьше сахара"
        v-model:value="store.notes"
      />
    </div>

    <ADivider />
    <div class="final flexed aic sb">
      <div>
        <ATypographyText type="secondary">Итого</ATypographyText>
        <ATypographyTitle :level="3" style="margin: 0">{{ finalSum }}₽</ATypographyTitle>
      </div>
      <AButton size="large" type="primary">Добавить в корзину</AButton>
    </div>
  </a-drawer>
</template>

<style scoped>
.image-container {
  width: 250px;
  padding: 30px;
  margin: 0 auto 20px;
  border-radius: 10px;
  background-color: #eeeeee;
}

.main-image {
  display: block;
  width: 200px;
  margin: 0 auto;
}
</style>
