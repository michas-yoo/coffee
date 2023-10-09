<script setup>
import { appStore } from "../store.js";
import { makeRequest } from "../api/apiClient.js";
import { notification } from "ant-design-vue";
import { mapModifiers } from "../utils/mapModifiers.js";
import { DEFAULT_PRODUCT_ID } from "../constants.js";
import { computed, onMounted, reactive } from "vue";
import AmountSelector from "../components/AmountSelector.vue";
import ProductModifier from "../components/ProductModifier.vue";

const { id, shopId } = defineProps({
  id: Number,
  shopId: Number,
});

const store = reactive({
  data: {
    id: 0,
    name: "",
    price: 0,
    photo: "",
    modifiers: {},
    can_be_iced: 0,
    modifier_types: [],
  },
  sum: 0,
  amount: 1,
  note: "",
  activeModifiers: {},
});

const finalSum = computed(() => {
  const modifiersSum = Object.values(store.activeModifiers)
    .reduce((sum, current) => {
      return sum + current.price;
    }, 0);

  return store.sum * store.amount + modifiersSum;
});

const onUpdateAmount = (newValue) => store.amount = newValue;

const onUpdateModifier = ({ ids, name, price }) => {
  store.activeModifiers[name] = { ids, price };
};

const onClose = () => {
  appStore.selectedProductId = DEFAULT_PRODUCT_ID;
};

const onAddToCart = () => {
  const selectedModifierIds = Object.values(store.activeModifiers)
    .map((modifier) => modifier.ids)
    .filter((modifier) => modifier)
    .join(",");

  const newCartItem = {
    productId: store.data.id,
    modifierIds: selectedModifierIds,
    price: finalSum.value,
    note: store.note,
  };

  // TODO: тут делаем запрос на бек
  console.log(newCartItem);
};

onMounted(async () => {
  try {
    store.data = await makeRequest("getProductInfo", {
      id,
      shopId,
    });

    store.data.modifiers = mapModifiers(store.data);
    store.sum = store.data.price;

    delete store.data.modifier_types;
  } catch (e) {
    console.log(e);
    notification.error({ message: e });
  }
});
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

    <ProductModifier
      v-for="modifier in store.data.modifiers"
      :key="modifier.id"
      :data="modifier"
      @modifier-update="onUpdateModifier"
    />

    <div class="note-container">
      <ADivider />
      <ATextarea
        size="large"
        allow-clear
        placeholder="Например: поменьше сахара"
        v-model:value="store.note"
      />
    </div>

    <ADivider />
    <div class="final flexed aic sb">
      <div>
        <ATypographyText type="secondary">Итого</ATypographyText>
        <ATypographyTitle :level="3" style="margin: 0">{{ finalSum }}₽</ATypographyTitle>
      </div>
      <AButton
        size="large"
        type="primary"
        @click="onAddToCart"
      >
        Добавить в корзину
      </AButton>
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
