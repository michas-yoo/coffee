import { mount } from "@vue/test-utils";
import { useAppStore } from "../src/stores/AppStore";
import { useCartStore } from "../src/stores/CartStore";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";
import { DEFAULT_PRODUCT, DEFAULT_SHOP } from "../src/defaults";
import { test, describe, expect, beforeEach, vi, afterEach } from "vitest";
// @ts-ignore
import CheckoutPage from "../src/pages/CheckoutPage.vue";

vi.mock("../src/api/apiClient", () => {
  const ApiClient = vi.fn();
  ApiClient.prototype.getCart = async () => new Promise((resolve) => resolve([]));
  return { ApiClient };
});

describe("Checkout", () => {
  let wrapper = null;
  let appStore = null;
  let cartStore = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    appStore = useAppStore();
    cartStore = useCartStore();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Cart is initially empty", () => {
    expect(cartStore.cart.length).toBe(0);
  });

  test("Checkout renders message when cart is empty", () => {
    wrapper = mount(CheckoutPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              AppStore: appStore,
              CartStore: cartStore,
            },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain("Корзина пока пуста!");
  });

  test("Checkout renders cart", () => {
    cartStore.setCart([{
      id: 1,
      shop_id: 1,
      user_id: 1,
      product_id: 1,
      amount: 1,
      modifier_ids: "",
      price: 120,
      comment: "",
      modifiers: [],
      product: DEFAULT_PRODUCT,
      shop: DEFAULT_SHOP,
    }]);

    wrapper = mount(CheckoutPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              AppStore: appStore,
              CartStore: cartStore,
            },
          }),
        ],
      },
    });

    expect(cartStore.getCartPrice()).toBe(120);
    expect(wrapper.text()).toContain("Эспрессо");
  });
});
