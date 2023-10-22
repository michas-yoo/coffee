<script lang="ts" setup>
import { Modal } from "ant-design-vue";
import { appStore } from "../store.ts";
import { makeRequest } from "../api/apiClient.ts";
import { getSumByKey } from "../utils/getSumByKey.ts";
import { handleError } from "../utils/handleError.ts";
import { mapModifiers } from "../utils/mapModifiers.ts";
import { computed, reactive, watch } from "vue";
import AmountSelector from "../components/AmountSelector.vue";
import ProductModifier from "../components/ProductModifier.vue";

const { shopId } = defineProps({
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
  comment: "",
  activeModifiers: {},
});

const id = computed(() => appStore.productId);

const finalSum = computed(() => {
  const modifiersSum = getSumByKey(Object.values(store.activeModifiers), "price");

  return (store.sum + modifiersSum) * store.amount;
});

const onUpdateAmount = (newValue) => store.amount = newValue;

const onUpdateModifier = ({ ids, name, price }) => {
  store.activeModifiers[name] = { ids, price };
};

const onClose = () => appStore.productId = 0;

const onBeforeAdd = () => {
  if (appStore.cart.length && appStore.cart[0].shop_id !== shopId) {
    Modal.confirm({
      title: "Вы выбрали товар в новом кафе",
      content: "Текущий из другого кафе будет удален из корзины",
      cancelText: "Отменить",
      onOk: async () => {
        appStore.cart = [];
        await makeRequest("clearCart");
        await onAddToCart();
      },
      onCancel: onClose,
    });
    return;
  }

  onAddToCart();
};

const onAddToCart = async () => {
  const selectedModifierIds = Object.values(store.activeModifiers)
    .map((modifier) => modifier.ids)
    .filter((modifier) => modifier)
    .join(",");

  const newCartItem = {
    comment: store.comment,
    price: finalSum.value,
    shop_id: shopId,
    amount: store.amount,
    productId: id.value,
    modifierIds: selectedModifierIds,
  };

  try {
    await makeRequest("addToCart", newCartItem);
    onClose();
  } catch (e) {
    console.log(e);
    handleError(e);
  }
};

watch(id, async (value) => {
  if (!value) {
    return;
  }

  try {
    store.data = await makeRequest("getProductInfo", {
      id: value,
      shopId,
    });

    store.sum = store.data.price;
    store.data.modifiers = mapModifiers(store.data);
    delete store.data.modifier_types;
  } catch (e) {
    console.log(e);
    handleError(e);
  }
});
</script>

<template>
  <a-drawer
    size="large"
    class="product-order"
    placement="bottom"
    :open="!!id"
    :closable="true"
    @close="onClose"
  >
    <div v-if="!store.sum" class="skeleton">
      <ASkeletonImage class="skeleton-image" />
      <ASkeleton active />
      <ASkeleton active />
    </div>
    <div v-else>
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

      <div class="comment-container">
        <ADivider />
        <ATextarea
          size="large"
          allow-clear
          placeholder="Например: поменьше сахара"
          v-model:value="store.comment"
        />
      </div>

      <div class="checkout-zone">
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
      </div>
    </div>
  </a-drawer>
</template>

<style scoped>
.skeleton {
  display: grid;
  gap: 30px;
}

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

.checkout-zone {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px;
  border-top: 1px solid var(--gray);
  background-color: white;
}

@media screen and (max-width: 360px) {
  .image-container {
    width: 200px;
  }

  .main-image {
    width: 150px;
  }
}
</style>
