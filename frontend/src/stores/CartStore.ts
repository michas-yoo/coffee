import { ref } from "vue";
import { defineStore } from "pinia";
import { ICartItem } from "../interfaces";

export const useCartStore = defineStore("CartStore", () => {
  const cart = ref<ICartItem[]>([]);

  const setCart = (data: ICartItem[]) => cart.value = data;

  return {
    cart,
    setCart,
  };
});
