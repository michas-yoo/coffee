import { ref } from "vue";
import { ICartItem } from "../interfaces";
import { defineStore } from "pinia";
import { getSumByKey } from "../utils/getSumByKey.ts";

export const useCartStore = defineStore("CartStore", () => {
  const cart = ref<ICartItem[]>([]);

  const setCart = (data: ICartItem[]) => cart.value = data;

  const getCartPrice = () => getSumByKey(cart.value, "price");

  return {
    cart,
    setCart,
    getCartPrice,
  };
});
