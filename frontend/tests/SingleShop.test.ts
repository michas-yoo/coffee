import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SingleShop from "../src/components/SingleShop.vue";

describe("SingleShop", () => {
  test("SingleShop should render a shop card", () => {
    const wrapper = mount(SingleShop, {
      props: {
        data: {
          id: 1,
          name: "Test shop",
          geo: "Test location",
          open_time: "09:00",
          close_time: "10:00",
          poster: "",
          menu: [],
          gallery: [],
        },
        orderNum: 1,
      },
    });

    expect(wrapper.text()).toContain("Test shop");
  });
});
