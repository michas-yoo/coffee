<script setup>
import { DeleteOutlined } from "@ant-design/icons-vue";
import { getSumByKey } from "../utils/getSumByKey.js";
import { computed } from "vue";

const { data } = defineProps({
  data: Object,
  removable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["remove"]);

const totalPrice = computed(() => (data.product.price + getSumByKey(data.modifiers, "price")) * data.amount);

const onDelete = () => {
  emit("remove", data.id);
};
</script>

<template>
  <ACard :title="`${data.amount}x ${data.product.name}`" class="item-card">
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

@media screen and (max-width: 350px) {
  .item-container {
    gap: 24px;
    flex-direction: column;
  }

  .poster {
    margin: 0 auto;
  }
}
</style>
