<script setup>
import { appStore } from "../store.js";
import { makeRequest } from "../api/apiClient.js";
import { mapModifiers } from "../utils/mapModifiers.js";
import { DEFAULT_PRODUCT_ID } from "../constants.js";
import { Modal, notification } from "ant-design-vue";
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

  return (store.sum + modifiersSum) * store.amount;
});

const onUpdateAmount = (newValue) => store.amount = newValue;

const onUpdateModifier = ({ ids, name, price }) => {
  store.activeModifiers[name] = { ids, price };
};

const onClose = () => {
  appStore.selectedProductId = DEFAULT_PRODUCT_ID;
};

const onBeforeAdd = () => {
  if (appStore.cart.length && appStore.cart[0].shopId !== shopId) {
    Modal.confirm({
      title: "Вы выбрали товар в новом кафе",
      content: "Текущий из другого кафе будет удален из корзины",
      cancelText: "Отменить",
      onOk: async () => {
        appStore.cart = [];
        await makeRequest("clearCart");
        await onAddToCart();
      },
      onCancel: () => {
        appStore.selectedProductId = null;
      },
    });
    return;
  }

  onAddToCart();
}

const onAddToCart = async () => {
  const selectedModifierIds = Object.values(store.activeModifiers)
    .map((modifier) => modifier.ids)
    .filter((modifier) => modifier)
    .join(",");

  const newCartItem = {
    note: store.note,
    price: finalSum.value,
    shop_id: shopId,
    amount: store.amount,
    productId: id,
    modifierIds: selectedModifierIds,
  };

  try {
    await makeRequest("addToCart", newCartItem);
    appStore.cart.push(newCartItem);
    onClose();
  } catch (e) {
    console.log(e);
    notification.error(e);
  }
};

onMounted(async () => {
  try {
    store.data = await makeRequest("getProductInfo", {
      id,
      shopId,
    });

    store.sum = store.data.price;
    store.data.modifiers = mapModifiers(store.data);
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
        @click="onBeforeAdd"
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
