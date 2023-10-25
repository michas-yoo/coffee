import { mount } from "@vue/test-utils";
import { DEFAULT_SHOP } from "../src/defaults";
import { describe, expect, test } from "vitest";
import SingleShop from "../src/components/ShopsGrid.vue";

describe("ShopsGrid", () => {
  const defaultShop = DEFAULT_SHOP;

  test("ShopsGrid should render two cards", () => {
    const wrapper = mount(SingleShop, {
      props: {
        data: [
          { ...defaultShop },
          { ...defaultShop, id: 2 },
        ],
      },
    });
    const cards = wrapper.findAll(".shop-card");

    expect(cards.length).toBe(2);
  });
});
