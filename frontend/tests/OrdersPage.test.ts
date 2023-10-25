import { useAppStore } from "../src/stores/AppStore";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { test, describe, expect, beforeEach, vi, afterEach } from "vitest";
// @ts-ignore
import OrdersPage from "../src/pages/OrdersPage.vue";
import { IOrder } from "../src/interfaces";

describe("OrdersPage", () => {
  let wrapper = null;
  let appStore = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    appStore = useAppStore();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.resetModules();
  });

  test("OrdersPage renders message when no orders", async () => {
    vi.mock("../src/api/apiClient.ts", () => {
      return {
        ApiClient: {
          getOrders: vi.fn(() => []),
        },
      };
    });

    wrapper = mount(OrdersPage, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            AppStore: appStore,
          },
        })],
      },
    });

    expect(wrapper.text()).toContain("Вы пока не совершали заказов");
  });

  test("OrdersPage should display order", async () => {
    vi.mock("../src/api/apiClient.ts", () => {
      const orders: IOrder[] = [
        {
          "id": 1,
          "shop_id": 3,
          "user_id": 1,
          "price": 248,
          "created_at": "2023-10-25 16:17:16",
          "status_id": 1,
          "items": [
            {
              "id": 1,
              "order_id": 1,
              "product_id": 5,
              "modifier_ids": "1,3,6",
              "amount": 1,
              "comment": "",
              "photo": "http://localhost:3000/static/cup_5.png",
              "name": "Черничное наслаждение",
            },
          ],
          "shop": {
            "name": "Кафе «1905» года",
            "geo": "1905 Года ул., 15",
          },
        },
      ];
      return {
        ApiClient: {
          getOrders: vi.fn(() => orders),
        },
      };
    });

    wrapper = mount(OrdersPage, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            AppStore: appStore,
          },
        })],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("Заказ №1");
  });
});
