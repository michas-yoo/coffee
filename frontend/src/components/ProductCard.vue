<script lang="ts" setup>
import { computed } from "vue";
import { getSumByKey } from "../utils/getSumByKey.ts";
import { IMappedProduct } from "../interfaces";
import { DeleteOutlined } from "@ant-design/icons-vue";

type ProductCardProps = {
  data: IMappedProduct,
  index?: number,
  removable?: boolean,
};

const { data, index } = withDefaults(defineProps<ProductCardProps>(), {
  index: 0,
  removable: false,
});

const emit = defineEmits(["remove"]);

const totalPrice = computed(() => (data.product.price + getSumByKey(data.modifiers, "price")) * data.amount);

const onDelete = () => {
  emit("remove", data.id);
};
</script>

<template>
  <ACard
    class="item-card"
    :title="`${data.amount}x ${data.product.name}`"
    :style="{transitionDelay: `${index * 0.2}s`}"
  >
    <template #extra v-if="removable">
      <AButton @click="onDelete">
        <DeleteOutlined />
      </AButton>
    </template>
    <div class="item-container">
      <div class="poster">
        <img :src="data.product.photo" :alt="data.product.name">
      </div>
      <div class="info">
        <ASpace direction="vertical" style="width: 100%">
          <ATypographyText class="flexed sb">
            <span style="font-weight: bold">Базовая цена</span>
            <span style="font-weight: bold">{{ data.product.price }}₽</span>
          </ATypographyText>
          <ATypographyText
            v-for="modifier in data.modifiers"
            :key="modifier.id"
            type="secondary"
            class="flexed sb"
          >
            <span>{{ modifier.name }}</span>
            <span>+ {{ modifier.price }}₽</span>
          </ATypographyText>
          <ATypographyText v-if="data.amount > 1" class="flexed sb">
            <span style="color: grey">Итого за 1</span>
            <span>{{ data.product.price + getSumByKey(data.modifiers, "price") }}₽</span>
          </ATypographyText>

          <ATypographyText class="flexed sb">
            <span style="font-weight: bold">Итого</span>
            <span style="font-weight: bold">{{ totalPrice }}₽</span>
          </ATypographyText>
        </ASpace>
      </div>
    </div>
    <div v-if="data.comment" class="comments">
      <ADivider />
      <ATypographyText type="secondary">Комментарий</ATypographyText>
      <br />
      <ATypographyText>{{ data.comment }}</ATypographyText>
    </div>
  </ACard>
</template>

<style scoped>
.item-container {
  display: flex;
  gap: 15px;
}

.poster {
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #eeeeee;
}

.poster img {
  width: 80px;
  height: 100px;
}

.info {
  flex: 1;
}

@media screen and (max-width: 360px) {
  .item-container {
    gap: 24px;
    flex-direction: column;
  }

  .poster {
    margin: 0 auto;
  }
}
</style>
